import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainUserInfo from './Partials/MainUserInfo';
import {Head, usePage, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import DrawerComponent from '../../Components/Drawer';
import { useEffect } from 'react';

const OtherUser = ({otherUser, posts}) => {
    const user = usePage().props.auth.user

    const {data, setData, errors, post, delete:destroy, get, reset} = useForm({
        post_id: null,
        user_id : null,
        like_id:null,
    })

    const handleLike = (post_id,user_id) => {
        setData({
            ...data,
            post_id,
            user_id
        });
    }

    const handleDislike = (like) => {
        setData({
            ...data,
            like_id:like.id
        });
    }

    useEffect(()=>{
        data.post_id != null  ? post(route('like.create'),{preserveScroll:true}): null
    },[data.post_id,data.user_id])

    useEffect(()=>{
        data.like_id != null ? destroy(route('like.remove'),{preserveScroll:true}): null
    },[data.like_id]) //I have to use this hook because of the way React works, if i use post or destroy straight after setting the data, react is going to send the previous data, i need to wait for a new render.
  
    return (
    <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profil de {otherUser.name}</h2>}
        >
            <Head title={`Profil de ${otherUser.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <MainUserInfo otherUser={otherUser} />
                    </div>
                    {/* On affiche tous ses posts */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className='p-6 m-4 rounded-md border-2 border-gray-300'>
                                <Pagination posts={posts} />
                                {otherUser.posts && otherUser.posts.map(post => (
                                    <div className='p-6 m-4 rounded-md border-2 border-gray-300 flex flex-col gap-5' key={post.id}>
                                        <div className='flex items-center justify-between'>
                                            <div className={`flex items-center gap-2`}> {/* If the user is hovering on his name, it won't be clickable */}
                                                {otherUser.path ? <img src={`/${otherUser.path}`} className='rounded-full block max-w-16 max-h-16 w-auto h-auto' /> : null }
                                                <h5><strong>{otherUser.name}</strong></h5>
                                            </div>
                                            <div className='flex gap-2'>
                                                <i className='hidden sm:block'>{post.created_at.split('T')[0]} | </i>
                                                <i className='hidden sm:block'>{post.created_at.split('T')[1].split('.')[0]} |</i>
                                            </div>
                                        </div>
                                        <h2>{post.title}</h2>
                                        <hr></hr>
                                        <p>{post.description}</p>
                                        {post.path ? (post.path.match(/http|https/) ? <img src={post.path} name='image'/> : <img src={`/${post.path}`} name='image'/>) : null } {/* We have to check if the image is coming from another website or from our local storage because we have to use absolute url for our local storage otherwise the url would be appended to the current url */}
                                        <div className='flex items-center justify-center gap-5'>
                                            {post.likes.find((like) => like.user_id == user.id) ? <button onClick={() => handleDislike(post.likes.find((like) => like.user_id == user.id))}><img src='/images/coeur-plein.png'/></button> : <button onClick={() => handleLike(post.id,user.id)}><img src='/images/coeur.png'/></button>} {/* And that's why we passe a user prop from the controller, because we wouldn't have the likes and the comments with auth*/}
                                            {/* <button><img src='/images/commenter.png'/></button> */} <DrawerComponent post={post} user={user} image={true}/>
                                            <button><img src='/images/envoyer.png'/></button>
                                        </div>
                                        <strong>{post.likes.length} j'aimes</strong>
                                        <DrawerComponent post={post} user={user}/>
                                    </div>
                                ))}
                                <Pagination posts={posts} />
                            </div>
                        </div>
                    </div>
                </div>
    </AuthenticatedLayout>
  )
}

export default OtherUser