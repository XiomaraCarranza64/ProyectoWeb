import { useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router'
import {appServices} from '../../../Services/app.services';


const Admin= ()=>{
  
   const [menu , setMenu]=useState(false)
   const [page, setPage] = useState(0);
   const navigate =useNavigate()

   const showingMenu =()=>{
     setMenu(!menu)
   }

   const myPost =async ()=>{
       try {
         const posts = await appServices.GetOwn(page, 20);
          if (posts) {
            console.log(posts)
            navigate('/show',{array: posts})}

         
     } catch(err) {
      console.log(err.response);
  }
      
   }

 return (
    
   <div className={`flex flex-col min-h-screen w-screen absolute bg-white ${menu ? "bg-opacity-50":"bg-opacity-0"}`}>
     <MenuIcon type="button" className="text-purple-500 w-10 text-center hover:text-purple-700" onClick={showingMenu} />
    
    {
      menu &&
     <lu className="flex flex-col absolute mt-10 h-screen bg-white list-none w-36 gap-4 min-h-screen rounded-lg text-purple-700 font-bold font-quicksand">
         <li type="button" className="mt-10 mx-2 cursor-pointer" onClick={myPost}> My Posts</li>
         <li type="button" className="mx-2 cursor-pointer"  onClick={()=>{navigate('/newpost')}} >Create New Post</li>
         <li type="button" className="mx-2 cursor-pointer"  onClick={myPost} >Edit My Posts</li>
      </lu>
    }
     
   </div>
   
 )




}
export default Admin