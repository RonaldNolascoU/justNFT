<?php

namespace App\Http\Controllers\Api;

use App\Models\Like;
use App\Models\Post;
use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function index()
    {
        /**
         *  TODO: If user has subscriptions, show only posts when he's subscribed. If the user is not subscribed to anyone, show only "JustYours" account post
         * "JustYours" is the main account
         * */

        $userSubscriptions = auth()->user()->subscriptions;
        $creatorIds =  $userSubscriptions->pluck('creator_id');
        $posts = Post::with(['likes', 'comments', 'saves' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }, 'creator' => function ($query) {
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
        $post->saves = $post->saves;
        $post->likes = $post->likes;
        $post->comments = $post->comments;

        return response()->json(['success' => true, 'post' => $post]);
    }

    public function savePost()
    {
        $savePost = Save::where('post_id', request()->id)->where('user_id', auth()->user()->id)->first();
        if ($savePost) {
            $savePost->delete();
            return response()->json(['success' => true, 'message' => 'Post Unsaved.']);
        }
        Save::create(['post_id' => request()->id, 'user_id' => auth()->user()->id]);

        return response()->json(['success' => true, 'message' => 'Post Saved.']);
    }

    public function likePost()
    {
        $likePost = Like::where('post_id', request()->id)->where('user_id', auth()->user()->id)->first();
        if ($likePost) {
            $likePost->delete();
            return response()->json(['success' => true, 'message' => 'Unliked']);
        }
        Like::create(['post_id' => request()->id, 'user_id' => auth()->user()->id]);

        return response()->json(['success' => true, 'message' => 'Liked']);
    }

    public function listPostSaved()
    {
        // TODO: Get only saved posts by user

        $posts = Save::whereHas('post')
        ->with('post', 'post.likes', 'post.comments', 'post.saves', 'post.creator', 'post.comments.user')
        ->where('user_id', auth()->user()->id)
        ->paginate(15);
        return response()->json(['success' => true, 'posts' => $posts]);
    }
}
