<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentCreatorRequest;
use App\Notifications\PendingApprovalNotification;

class CreatorController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $creators = User::where('role_id', '!=', 2)->get();

        return response()->json(['success' => true, 'creators' => $creators]);
    }

    public function store(ContentCreatorRequest $request)
    {
        if (!auth()->user()->isMetamask()) {
            $all = $request->all();
            $idImgs = $all['file'];
            $profileImg = $all['profileImage'];

            $idsImgPaths = $this->processImg($idImgs);
            $profileImgPath = $this->saveImg($profileImg);

            unset($all['file'], $all['profileImage']);

            $all = array_merge(
                $all,
                [
                    'id_img_1' => $idsImgPaths[0],
                    'id_img_2' => $idsImgPaths[1],
                    'profile_img' => $profileImgPath,
                    'approved' => false,
                    'creator_request_send' => true
                ]
            );

            $all['username'] = strtolower($all['username']);

            User::where('email', auth()->user()->email)->update($all);

            $user->notify(new PendingApprovalNotification($user));

            return response()->json(
                [
                    'success' => true,
                    'message' => 'Your request was sent to our system. We’ll notify you via email with request status',
                    'user' => User::find(auth()->user()->id)
                ]
            );
        }

        return response()->json(['success' => false, 'msg' => 'Unauthorized'], 403);
    }

    public function processImg(array $images)
    {
        $info = [];
        foreach ($images as $image) {
            array_push($info, $this->saveImg($image));
        }

        return $info;
    }

    public function saveImg($image)
    {
        $filename = time() . '.' . str_replace(' ', '-', $image->getClientOriginalName());
        $path = "images/creators/$filename";
        \Storage::disk('s3')->put($path, file_get_contents($image));

        return $path;
    }
}
