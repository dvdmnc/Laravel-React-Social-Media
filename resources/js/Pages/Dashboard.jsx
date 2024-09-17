import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {useEffect} from 'react'
import Pagination from '@/Components/Pagination';
import DrawerComponent from '../Components/Drawer';

export default function Dashboard({ auth, posts, user, success }) {
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

    const handleDislike = (like_id) => {
        setData({
            ...data,
            like_id
        });
    }

    useEffect(()=>{
        data.post_id != null  ? post(route('like.create'),{preserveScroll:true}): null
    },[data.post_id,data.user_id])

    useEffect(()=>{
        data.like_id != null ? destroy(route('like.remove'),{preserveScroll:true}): null
    },[data.like_id]) //I have to use this hook because of the way React works, if i use post or destroy straight after setting the data, react is going to send the previous data, i need to wait for a new render.

    useEffect(()=>{
        reset() //Otherwise they keep the previous value
    })
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fil d'actualité</h2>}
        >
            <Head title="Mon fil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Bienvenue {auth.user.name} !</div>
                        {success && (
                            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" >
                                {success}
                            </div>
                             )}
                        <div className='p-6 m-4 rounded-md border-2 border-gray-300'>
                            <Pagination posts={posts} />
                            {posts && posts.data.map(post => (
                                <div className='p-6 m-4 rounded-md border-2 border-gray-300 flex flex-col gap-5' key={post.id}>
                                    <div className='flex items-center justify-between'>
                                        <h5><strong>{post.creator.name}</strong></h5>
                                        <div className='flex gap-2'>
                                            <i className='hidden sm:block'>{post.created_at.split('T')[0]} | </i>
                                            <i className='hidden sm:block'>{post.created_at.split('T')[1].split('.')[0]} |</i>
                                            {post.creator.id == user.id && 
                                            <>
                                            <a className='mx-2 flex items-center' href={route('post.edit',post.id)}>
                                                <img src='/images/crayon-de-couleur.png' width='24' height='24'/>
                                                <i className='hidden sm:block'>Editer</i>
                                            </a>
                                            <button onClick={() => destroy(route('post.delete',post.id))}>
                                                <img src='/images/supprimer.png' width='24' height='24'/>
                                            </button>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    <h2>{post.title}</h2>
                                    <hr></hr>
                                    <p>{post.description}</p>
                                    {post.path ? (post.path.match(/http|https/) ? <img src={post.path} name='image'/> : <img src={`/${post.path}`} name='image'/>) : null } {/* We have to check if the image is coming from another website or from our local storage because we have to use absolute url for our local storage otherwise the url would be appended to the current url */}
                                    <div className='flex items-center justify-center gap-5'>
                                        {user.likes.find((like) => like.post_id == post.id) ? <button onClick={() => handleDislike(user.likes.find((like) => like.post_id == post.id))}><img src='/images/coeur-plein.png'/></button> : <button onClick={() => handleLike(post.id,user.id)}><img src='/images/coeur.png'/></button>} {/* And that's why we passe a user prop from the controller, because we wouldn't have the likes and the comments with auth*/}
                                        {/* <button><img src='/images/commenter.png'/></button> */} <DrawerComponent post={post} user={auth.user} image={true}/>
                                        <button><img src='/images/envoyer.png'/></button>
                                    </div>
                                    <strong>{post.likes.length} j'aimes</strong>
                                    <DrawerComponent post={post} user={auth.user}/>
                                </div>
                            ))}
                            <Pagination posts={posts} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
