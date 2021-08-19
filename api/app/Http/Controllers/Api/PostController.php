<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Save;

class PostController extends Controller
{
    public function index()
    {
        $userSubscriptions = auth()->user()->subscriptions;
        $creatorIds =  $userSubscriptions->pluck('creator_id');
        $posts = Post::with(['likes', 'comments', 'saves', 'creator' => function ($query) {
            $query->select('name', 'username');
        }, 'comments.user' => function ($query) {
            $query->select('name', 'username');
        }])->paginate(15);

        // if ($userSubscriptions->count() > 0) {
        //     $posts = Post::with(['likes', 'comments', 'creator' => function ($query) {
        //         $query->select('name', 'username');
        //     }, 'comments.user' => function ($query) {
        //         $query->select('name', 'username');
        //     }])->where('is_main', true)->whereIn('creator_id', $creatorIds)->paginate(15);
        // } else {
        //     $posts = Post::with(['likes', 'comments', 'creator' => function ($query) {
        //         $query->select('name', 'username');
        //     }, 'comments.user' => function ($query) {
        //         $query->select('name', 'username');
        //     }])->where('is_main', true)->paginate(15);
        // }

        return response()->json(['success' => true, 'posts' => $posts]);
    }

    public function show(Post $post)
    {
        $post->creator = $post->creator;

        return response()->json(['success' => true, 'post' => $post]);
    }

    public function savePost()
    {
        $savePost = Save::where('post_id', request()->id)->first();
        if ($savePost) {
            $savePost->delete();
            return response()->json(['success' => true, 'message' => 'Post Unsaved.']);
        }
        Save::create(['post_id' => request()->id, 'user_id' => auth()->user()->id]);

        return response()->json(['success' => true, 'message' => 'Post Saved.']);
    }

    public function listPostSaved()
    {
        $posts = Post::has('saves')->with(['likes', 'comments', 'saves', 'creator' => function ($query) {
            $query->select('name', 'username');
        }, 'comments.user' => function ($query) {
            $query->select('name', 'username');
        }])->paginate(15);

        return response()->json(['success' => true, 'posts' => $posts]);
    }
}
