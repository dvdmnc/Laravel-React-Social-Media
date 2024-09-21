import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useForm } from "@inertiajs/react"


const DrawerComponent = ({user, post, image}) => {
  const {data, setData, post:SendPost, delete:commentDelete, errors,reset} = useForm({
    post_id : post.id,
    user_id : user.id,
    content: ''
  })

  return (
    <Drawer >
      <DrawerTrigger asChild>
        {image ? <button><img src='/images/commenter.png'/></button> : <button>Voir les {post.comments.length} commentaires</button>}
      </DrawerTrigger>
      <DrawerContent >
      <div className="w-screen ">
          <DrawerHeader>
            <DrawerTitle>Commentaires</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className='overflow-auto max-h-[70vh] p-4'>
          <h5><strong>{post.creator ? post.creator.name : user.name}</strong></h5> {/* Because for MyPosts i didn't pass the creator of each posts in the controller as i retrieved only the posts created by the current user */}
          <h3>{post.title}</h3>
          {post.description?.length ?
              <p>{post.description}</p> : null}
              <br></br>
            <hr></hr>
          {post.comments.length ? post.comments.map((comment) => (
            <div key={comment.id} className="p-4">
              <div className='flex justify-between items-center' >
              <strong>{comment.user.name}</strong>
              {user.id == comment.user.id ? <img src='/images/supprimer.png' width={24} heigh={24} onClick={(e) => {e.preventDefault(); commentDelete(route('comments.remove',{id:comment.id}),{preserveScroll:true})}}/> : null}
              </div>
              <p>{comment.content}</p>
              <br></br>
              <hr></hr>
              </div>)) : <><p>Aucun commentaire pour le moment</p>
              <br></br>
            </>}
            </ScrollArea>
            <input type='text' placeholder="Ecrire un commentaire" className="w-[90vw] mx-4" value={data.content} onChange={(e) => setData({...data, content:e.target.value})}/>
          {errors.content && <div className='text-red-600 font-semibold'>{errors.content}</div>}
          <DrawerFooter>
            <button className="border-2 border-black p-4 rounded-md" onClick={(e) => {e.preventDefault(); SendPost(route('comments.create'),{onSuccess: () => reset()})}}>Valider</button>
            <DrawerClose asChild>
              <button className="border-2 border-black p-4 rounded-md">Annuler</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComponent