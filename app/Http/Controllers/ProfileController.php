<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Models\Post;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $followers = count($user->followers()->get());
        $following = count($user->followings()->get());

        $posts = count($user->posts()->get());

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'follow'=>[$followers,$following],
            'posts'=>$posts
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {  
        if($request->has('path') && !is_string($request->path)){
            
            $receivedPath = $request->file('path');
            $newFilePath = $receivedPath->store('images','public');

            $request->user()->path ? Storage::disk('public')->delete($request->user()->path) : null;
            $request->user()->update(['path'=>$newFilePath]);

            return Redirect::route('profile.edit');
        }

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function otherUser($username){
        $otherUser = User::with([
            'posts' => function($query) {
                $query->with([
                    'likes',
                    'comments' => function($query) {
                        $query->with('user');
                    }
                ])->orderBy('created_at', 'desc'); // Order posts by created_at descending
            },
            'followers',
            'followings'
        ])->where('name', '=', $username)
          ->firstOrFail();

        $posts = $otherUser->posts()->paginate(10);
        
        return Inertia::render('Profile/OtherUser', [
            'otherUser'=>$otherUser,
            'posts'=>$posts
        ]);
    }

    public function follow($id){
        $authUser = User::find(Auth::id());

        $authUser->followings()->attach($id);

        return redirect()->back();
    }

    public function unfollow($id){
        $authUser = User::find(Auth::id());

        $authUser->followings()->detach($id);

        return redirect()->back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
