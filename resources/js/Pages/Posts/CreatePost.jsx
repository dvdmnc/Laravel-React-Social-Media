import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';


const CreatePost = ({auth}) => {
    const {data, setData, errors, post:submitPost, processing} = useForm({
        title:'',
        description : '',
        path:'',
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        submitPost(route('post.create'));
    };


  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Créer une nouvelle Publication</h2>}
        >
            <Head title="Nouvelle Publication" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='p-6 m-4 rounded-md border-2 border-gray-300'>
                            <form className='flex flex-col gap-5 items-center ' onSubmit={handleSubmit}>
                                    <div className='flex items-center flex-col'>
                                        <strong><label htmlFor='title'>Titre</label></strong>
                                        <input type='text' className='w-full' value={data.title} onChange={(e) => setData('title',e.target.value)} />
                                        {errors.title && <div className='text-red-600 font-semibold'>{errors.title}</div>}
                                    </div>
                                    <strong><label htmlFor='description'>Description</label></strong>
                                    <textarea className='w-full' name='description' rows={8} onChange={(e) => setData('description',e.target.value)}>
                                        {data.description}
                                    </textarea>
                                    {errors.description && <div className='text-red-600 font-semibold'>{errors.description}</div>}
                                    <strong><label htmlFor='image'>Image</label></strong>
                                    <div>
                                        <u><label htmlFor='imageChange'>Charger une nouvelle image</label></u>
                                        <br></br>
                                        <input type='file' onChange={(e) => setData('path',e.target.files[0])}/>
                                    </div>
                                    {errors.path && <div className='text-red-600 font-semibold'>{errors.path}</div>}
                                    <button type='submit' disabled={processing} className='text-black rounded-md border-2 border-gray-300 p-4 text-xl hover:bg-gray-300 hover:text-white' >Poster</button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
    </ AuthenticatedLayout >
  )
}

export default CreatePost