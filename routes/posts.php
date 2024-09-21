<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::middleware('auth')->name('like.')->prefix('/like')->group(function (){
    Route::post('/new', [PostController::class, 'newLike'])->name('create');
    Route::delete('/remove',[PostController::class, 'removeLike'])->name('remove');
});

Route::middleware('auth')->name('post.')->prefix('/post')->group(function() {
    Route::get('/edit/{id}',[PostController::class,'edit'])->name('edit');
    Route::get('/create',[PostController::class,'create'])->name('create');
    Route::get('/followed',[PostController::class,'followed'])->name('followed');
    Route::post('/create',[PostController::class,'create'])->name('create');
    Route::post('/edit/{id}',[PostController::class,'update'])->name('update');
    Route::delete('/delete/{id}',[PostController::class,'delete'])->name('delete');
});

Route::middleware('auth')->get('/mespublications',[PostController::class,'myPosts'])->name('myposts');

Route::middleware('auth')->name('comments.')->prefix('/comments')->group(function (){
    Route::post('/new', [PostController::class, 'newComment'])->name('create');
    Route::delete('/remove/{id}',[PostController::class, 'removeComment'])->name('remove');
});