<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\CommentUpdateRequest;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;


class PostController extends Controller
{
    public function get(){
        $posts = Post::with('creator','likes','comments.user')->orderBy('created_at', 'desc')->paginate(10); //We use the creator function from the post model to get all the information of the user who created the post
        $user = User::with('likes','comments','shares')->find(Auth::id());

        return Inertia::render('Dashboard', [
            'posts'=>$posts,
            'user'=>$user,
            'success' => session('success') //This the success message we get if we've just updated a post successfully, in Laravel it's accessible through the session() and is null if there's success message
        ]);
    }

    public function edit($id){
        $post = Post::find($id);

        return Inertia::render('Posts/EditPost', [
            'post'=>$post
        ]);
    }

    public function delete($id){
        Post::find($id)->delete();

        return to_route('dashboard')->with('success','Le post à bien été supprimé !');

    }

    public function update(UpdatePostRequest $request){
        $data = $request->validated();
        $receivedPath = $request->hasFile('path') ? $request->file('path') : $request->input('path'); //Because if we save the changes but we didn't update the image, we would receive a string in the path

        $post = Post::find($request->input('id'));
        $post->update(['description' => $data['description']]);

        if (!is_string($receivedPath)){ 
            $newFilePath = $receivedPath->store('images','public');

            $currentPath = $post->path;
            $post->update(['path'=>$newFilePath]);

            Storage::disk('public')->delete($currentPath);
        }
        

        return to_route('dashboard')->with('success','Le post à bien été mis à jour !');
    }

    public function myPosts(){
        $user_id = Auth::user()->id;

        $posts = Post::with('likes','comments.user')->where('created_by',$user_id)->orderBy('created_at', 'desc')->get();
        $user = User::with('likes','comments','shares')->find(Auth::id());

        return Inertia::render('Posts/MyPosts', [
            'posts'=>$posts,
            'user'=>$user
        ]);
    }

    public function create(UpdatePostRequest $request){
        if($request->isMethod('GET')) {
            return Inertia::render('Posts/CreatePost');
        };

        $data = $request->validated();
        if($request->hasFile('path')){
            $path = $request->file('path')->store('images','public');
            $data['path'] = $path;
        }
        $data['created_by'] = Auth::user()->id;

        Post::create($data);

        return to_route('dashboard')->with('success','La publication à bien été crée');
    }

    //For the comments
    public function newComment(CommentUpdateRequest $request){
        $content = $request->validated('content');
        $post_id = $request->input('post_id');
        $user_id = $request->input('user_id');

        Comment::create(['post_id'=>$post_id,'user_id'=>$user_id,'content'=>$content]);

        return redirect()->back();
    }

    public function removeComment($id){
        Comment::destroy($id);

        return redirect()->back();
    }

    //For the likes

    public function newLike(Request $request){
        $post_id = $request->post('post_id');
        $user_id = $request->post('user_id');

        Like::create(['post_id'=>$post_id,'user_id'=>$user_id]);

        return redirect()->back();
    }

    public function removeLike(Request $request){
        $like_id = $request->post('like_id');

        Like::destroy($like_id);

        return redirect()->back();
    }

    public function followed(Request $request){
        $current_user = User::find(Auth::id());
        $posts = Post::whereIn('created_by', $current_user->followings()->pluck('users.id'))
        ->with([
            'creator',  
            'comments.user',  
            'likes' 
        ])
    ->orderBy('created_at', 'desc')
    ->paginate(10);  

            return Inertia::render('Posts/Followed', [
                'posts'=>$posts
            ]);
    }
}
