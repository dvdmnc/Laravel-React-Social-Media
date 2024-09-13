import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

function EditPost({post , auth}) {
    const {data, setData, errors, post:sendPatch, processing} = useForm({
        id: post.id,
        title:post.title,
        description : post.description,
        path:post.path,
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        sendPatch(route('post.update', post.id), { //It seems that we have to use the post request even if we want to patch when we're sending a file
            forceFormData: true,
        });
    };
    
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editer mon Post</h2>}
        >
            <Head title="Editer mon Post" />
        
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='p-6 m-4 rounded-md border-2 border-gray-300'>
                            <form className='flex flex-col gap-5 items-center ' onSubmit={handleSubmit}>
                                <div className='flex items-center flex-col'>
                                    <strong>Titre</strong>
                                    <small>(Ne peut pas être modifié)</small>
                                    <br></br>
                                    <h1>{post.title}</h1>
                                </div>
                                <strong><label htmlFor='description'>Description</label></strong>
                                <textarea className='w-full' name='description' rows={8} onChange={(e) => setData('description',e.target.value)}>
                                    {post.description}
                                </textarea>
                                {errors.description && <div className='text-red-600 font-semibold'>{errors.description}</div>}
                                <strong><label htmlFor='image'>Image</label></strong>
                                {post.path ? (post.path.match(/http|https/) ? <img src={post.path} name='image'/> : <img src={`/${post.path}`} name='image'/>) : null }
                                <div>
                                    <u><label htmlFor='imageChange'>Charger une nouvelle image</label></u>
                                    <br></br>
                                    <input type='file' onChange={(e) => setData('path',e.target.files[0])}/>
                                </div>
                                {errors.path && <div className='text-red-600 font-semibold'>{errors.path}</div>}
                                <button type='submit' disabled={processing} className='text-black rounded-md border-2 border-gray-300 p-4 text-xl hover:bg-gray-300 hover:text-white' >Sauvegarder les changements</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  )
}

export default EditPost