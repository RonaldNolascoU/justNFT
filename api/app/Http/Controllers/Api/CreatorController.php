<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContentCreatorRequest;

class CreatorController extends Controller
{
    public function store(ContentCreatorRequest $request)
    {
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
                'role_id' => 2,
            ]
        );

        User::where('email', auth()->user()->email)->update($all);

        return response()->json(['success' => true, 'user' => User::find(auth()->user()->id)]);
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
        $path = "images/$filename";
        \Storage::disk('local')->put($path, file_get_contents($image));

        return $path;
    }
}
