import { appServices } from '../../Services/app.services';
import { HeartIcon } from '@heroicons/react/solid';
import { ChatAlt2Icon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { PencilAltIcon } from '@heroicons/react/solid';
import { useState,useEffect,useRef } from 'react';
import {useNavigate ,useLocation} from 'react-router';


import Comment from '../Comment/Comment'
import { toast, ToastContainer } from 'react-toastify';


function PostCard({post,favs}) {
console.log(favs.favorites)
  
  const [fav,setFav]=useState(favs.favorites.includes(post._id))
  const [edit,setEdit]=useState(false)
  const [like,setLike]=useState(post.likes.some( it=> it.username===post.user.username))

  
  const [numlikes,setNumlikes]= useState(post.likes.length)
  const [numcomm,setNumcomm]= useState(post.comments.length)

  const [value,setValue]=useState('')
  
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');


  useEffect(()=>{
   
    if (!token)
      navigate('/');
    else if (location.pathname=='/show'&&role==="admin"){
      setEdit(true)
    }

   

    
   
    
   },[])
   
   async function likePost(){
     try{
      const data= await appServices.Like(post._id);
      if(!like){
        setNumlikes(numlikes+1)
        setLike(true)
      }else{
        setNumlikes(numlikes-1)
        setLike(false)
      }
      
     }catch(error){
       console.log(error)
     }
   }

   const valueChange =(e)=>{
     setValue(e.target.value)
    
   }


   async function commentPost(){
    try{
       
      

      if(value.length<=8){
        toast('The comment has to have at least 8 letters',{type:'warning'})
        return;
      }else {
         await appServices.Comment(post._id,value);
         setNumcomm(numcomm+1)
         
      }

     }catch(error){
      console.log(error)
    }
  }
    async function favPost(){
      try{
       const data= await appServices.Fav(post._id);
       setFav(!fav)
       
      }catch(error){
        console.log(error)
      }
    }
 
    
  
   
   const updatePost=()=>{
    if (location.pathname=='/show')
     navigate(`/update/${post._id}/${post.active}`)
     else {
       return;
     }
  } 

  
  
  return (
    <div className="font-quicksand   ">
      <ToastContainer/>
     { post && 
     
       <div className="bg-white flex flex-col mt-2 w-full p-4 md:w-60 md:h-full ">
          <div className="w-full flex justify-end">
            <PencilAltIcon type="button" className={`cursor-pointer  w-5  text-black flex justify-center  hover:text-gray-300 ${edit? "text-black":"text-gray-400"}`} onClick={updatePost}/>
         </div>  
         <div>
              <h1 className= "font-bold text-xl p-4 text-center overflow-hidden"> {post.title} </h1>
         </div>
         <div className=" flex justify-center border-2">
          { post.image && 
            <img src={post.image} className=" w-50 h-40 px-4" />
          }
          {
             post.image===null && 
             <img src="https://picsum.photos/200" className="w-50 h-40 px-4" />
          }
        </div>
        <div >
          <p className=" overflow-hidden">{post.description}</p>
        </div>
        <div className="flex justify-between py-2">
            <div className="text-purple-700 font-semibold ">
            <p className="px-0.5"> @{post.user.username}</p>
            </div>
              <div className="flex gap-2 px-1"> 
              <div className="flex flex-row gap-1">
                <HeartIcon type="button" className={`cursor-pointer mb-2 w-5 text-black-700 hover:text-red-700 ${like? "text-red-600":"text-black"}`} onClick={likePost} />
                <p>{numlikes}</p>
              </div>
              <div className=" cursor-pointer flex flex-row gap-1">
              <ChatAlt2Icon  className=" mb-2 w-5 text-black-700 hover:text-gray-400 " />
              <p>{numcomm}</p>
              </div>
              <BookmarkIcon type="button" className= {`cursor-pointer w-5 mb-2  hover:text-gray-300 ${fav? "text-purple-900" : "text-black-700"}`} onClick={favPost}/>
              </div>
            </div>   
            <p className="text-xs ml-2 mt-4 text-right px-2 mb-2">
                {post.createdAt}
            </p>
            <div className="font-quicksand flex flex-col  justify-center md:h-full ">
        {
          post.comments.map((comment)=>(
            <div className="bg-white mt-1 mb-1 mx-2 border-gray-400 shadow-lg">
            <div className="flex  justify-center flex-grow gap-2" >
                     <UserCircleIcon className=" w-4 mt-1 "/>
                  <p className="text-xs font-bold">{comment.user.username}</p>
             </div>
             <p className=" text-xs text-center ">{comment.description}</p>
             </div >
             
          ))

        }
          </div >
          <form className="flex mt-2 ">
                <PencilAltIcon className= "w-8 mt-1 text-black md:mt-1"/>
                <input className= "w-96  border-black border-2 rounded-md text-sm " type="text" placeholder="Add a commment" onChange={valueChange}></input>
                <button type="button" className="bg-black rounded-xl   py-1.5 font-quicksand font-semibold text-white mx-2 md:px-2"onClick={commentPost} >Add!</button>
          
            </form>
      </div>
     }


        
</div>
    
  );
}
export default PostCard;