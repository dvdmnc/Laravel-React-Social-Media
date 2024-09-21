import React, { useEffect } from 'react'
import { usePage, useForm } from '@inertiajs/react';

/*This component is used to display the main user information in the profile page (like it's avatar, name, number of posts and followers/followings) but also to display the main information about a user clicked and to be able to follow/unfollow this user (when this component is a Child of OtherUser component).
If there is otherUser in the props, then we're displaying the profile of a user clicked, otherwise it's the current user information (without the button follow/unfollow).
The Back End logic is handled in the ProfileController */
const MainUserInfo = ({follow, posts, otherUser}) => {
    const user = otherUser ? otherUser : usePage().props.auth.user

    const {data, setData, errors, post:submitPost, delete:Delete, processing} = useForm({
        path:user.path,
        followers:follow ? follow[0] : (otherUser.followers ? otherUser.followers.length : null),
        following:follow ? follow[1] : (otherUser.followings ? otherUser.followings.length : null),
        posts:posts ? posts : otherUser.posts.length
    })

    const handleFollow = (e) => {
        e.preventDefault()
        submitPost(route('profile.follow',{'id':otherUser.id}),{preserveScroll:true, data:{id:otherUser.id}, onSuccess: () => {
            setData('followers', data.followers + 1)}})
    }

    const handleUnfollow = (e) => {
        e.preventDefault();
        Delete(route('profile.unfollow',{'id':otherUser.id}),{preserveScroll:true, data:{id:otherUser.id}, onSuccess: () => {
            setData('followers', data.followers - 1)}})
    }

    useEffect(() => {
        data.path ? submitPost(route('profile.image.update'),{data:{path:data.path},preserveScroll:true, forceFormData:true, onError: (errors)=>console.log(errors)}) : null //When sending a file always use post, patch doesn't work with Inertia
    },[data.path])

  return (
    <section className='flex justify-evenly items-center flex-wrap gap-4' >
        <div className='flex flex-col items-center gap-2'>
        {user.path ?  <img src={`/${user.path}`} name='image' className='rounded-md block max-w-56 max-h-56 w-auto h-auto'/> :
            <img src={`/images/avatar.jpg`} name='image' className='rounded-md block max-w-20 max-h-20 w-auto h-auto'/>
            }
            {otherUser ? null : <><u><label htmlFor='imageChange' >Charger une nouvelle photo de profil</label></u>
            <input type='file' onChange={(e) => setData('path',e.target.files[0])} className='py-4'/>
            <hr></hr></>}
            <h1><strong>{user.name}</strong></h1>
            {errors.path && <div className='text-red-600 font-semibold'>{errors.path}</div>}
        </div>
        <div className='flex justify-evenly items-center gap-4'>
            <div className='text-center'>
                <strong>{data.posts ? data.posts : 0}</strong>
                <p>publications</p>
            </div >
            <div className='text-center'>
                <strong>{data.followers ? data.followers : 0}</strong>
                <p>followers</p>
            </div>
            <div className='text-center'>
                <strong>{data.following ? data.following : 0}</strong>
                <p>suivi(e)s</p>
            </div>
        </div>
        {otherUser ? (
                <div>
                {otherUser.followers.find((follower) => follower.id == usePage().props.auth.user.id) ? <div className='flex gap-2'>
                    <button className='border-2 border-green-500 p-4 rounded-md pointer-events-none cursor-default'>Suivi</button>
                    <button className='border-2 border-red-500 p4 rounded-md p-4' onClick={handleUnfollow}>Ne plus suivre</button>
                    </div> : <button className='border-2 border-black p-4 rounded-md' onClick={handleFollow}>Suivre</button>}
                </div>
            ) : null}
    </section>
  )
}

export default MainUserInfo