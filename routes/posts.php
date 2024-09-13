<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;

Route::name('like.')->prefix('/like')->group(function (){
    Route::post('/new', [PostController::class, 'newLike'])->name('create');
    Route::delete('/remove',[PostController::class, 'removeLike'])->name('remove');
});

Route::name('post.')->prefix('/post')->group(function() {
    Route::get('/edit/{id}',[PostController::class,'edit'])->name('edit');
    Route::get('/create',[PostController::class,'create'])->name('create');
    Route::post('/create',[PostController::class,'create'])->name('create');
    Route::post('/edit/{id}',[PostController::class,'update'])->name('update');
    Route::delete('/delete/{id}',[PostController::class,'delete'])->name('delete');
});

Route::get('/mespublications',[PostController::class,'myPosts'])->name('myposts');