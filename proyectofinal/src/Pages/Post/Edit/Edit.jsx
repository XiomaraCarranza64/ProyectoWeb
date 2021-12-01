import { HeartIcon } from '@heroicons/react/solid';
import { ChatAlt2Icon } from '@heroicons/react/solid';
import {UserCircleIcon} from '@heroicons/react/solid';
import { PencilAltIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router';
import { useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router';
import { appServices } from '../../../Services/app.services';
import { ToastContainer,toast } from 'react-toastify';

import Comment from '../../Comment/Comment'

const Edit= () => {
    
  
  
  let params = useParams();
    const navigate = useNavigate()

    const [one,setOne] = useState();
    const [title,setTitle] = useState("");
    const [description,setDescription ]= useState("");
    const [image,setImage] = useState("");
    const [active ,Isactive]=useState()
    
    const newTitle = useRef(null);
    const newDescriptio = useRef(null);
    const newImage = useRef(null);
    
    
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    
    useEffect(()=>{
        
        async function fetchPost() {
            try {
                const post = await appServices.GetOne(params.idpost);
                  await setOne(post);
                  if (params.active === "true")
                   Isactive(true);
                   else 
                   Isactive(false);
               
            } catch(err) {
                
            }
        }
      
        if (!token||role=="user")
          navigate('/');
        else{
          fetchPost();
         
        }

    },[])
      const changeStatus=async()=>{
       
        console.log(one._id)
       const actived = await appServices.Active(params.idpost)
         Isactive(!active)
        navigate('/main')

      }
       const updateData=async(e)=>{
           try{
             
             e.preventDefault();
             if (newTitle.current.value=="")  setTitle(one.title)
             else setTitle(newTitle.current.value)
             if (newDescriptio.current.value=="") setDescription(one.description)
             else setDescription(newDescriptio.current.value)
             if (newImage.current.value=="") setImage(one.image)
             else setImage(newImage.current.value)
             
          
            const updated = await appServices.Update(one._id,title,description,image)
            if (updated) {
             toast('Updated successfully',{type:'success'})
             navigate('/main')
          }
         }catch(e){
             console.log(e.response)
         }
       }
      
       
      
    
    return (
        
    <div className="font-quicksand p-6 flex flex-col justify-center min-h-screen w-full bg-gradient-to-t from-red-300 to-red-500 absolute">
        < ToastContainer/>
         <div className="flex flex-col shadow-2xl w-full rounded-lg bg-white justify-center  py-10 ">
            {one &&
             <div >
               <div className="font-quicksand flex justify-center px-10 mt-2">
               <div type="button"  className="shadow-2xl h-full w-full py-4">
      
              <div className="flex justify-center gap-4">
                  <p className="text-gray-400 font-extrabold mt-1.5 px-4">Current value :</p>
                <h1 className="mt-1 font-bold mb-4 text-xl">   {one.title} </h1>
             </div>
              <div className="flex justify-center b">
                <input type="text" placeholder="Type new title" className="border-black border-2 w-10/12 my-2 rounded-xl px-3 py-1" ref={newTitle}></input>
             </div>
             <div className=" flex justify-center border-2">
                 
             <p className="text-gray-400 font-extrabold mt-1.5 px-4">Current image :</p>
                { one.image && 
                 <img src={one.image} className=" w-50 h-40 px-4 py-2" />
                }
              {
                one.image===null && 
                <img src="https://images.unsplash.com/photo-1591152231320-bc7902cf852e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80" className=" w-50 h-40 px-4" />
              }
              
           </div>
            
        <div className="flex justify-center">
           <input type="text" placeholder="Type new URL" className="border-black border-2 w-10/12 my-2 rounded-xl px-3 py-1"  ref={newImage}></input>
            </div>
              <div className="flex  flex-col justify-center ">
                 <p className="text-gray-400 font-extrabold mt-1.5 text-center">Current description :</p>
                <p className="text-xs overflow-x-hidden text-center">{one.description}</p>
                <div className="flex justify-center">
                <input type="text" placeholder="Type new description" className="border-black border-2 w-10/12 my-2 rounded-xl px-3 py-2"  ref={newDescriptio}></input>
             
                </div>
                 </div>
             <div className="flex  flex-row ml-2 ">
             
             <div className="flex justify-start text-left ml-2 mb-1 mt-2 text-gray-400 font-bold mx-10">
              
              </div>
              <p className="text-xs ml-2 mt-4 text-right px-2 mb-2">
          {one.createdAt}
             </p>
          </div>
        
       
      </div >
    </div>
 </div> 
              
}
<div  className="flex justify-center gap-2 mt-4">
    <button type="button "className={`text-gray-400 font-quicksand font-bold px-10  hover:bg-red-800 p-4 rounded-xl ${active? "bg-red-700 ":"bg-red-200 "}`} onClick={changeStatus}>Active</button>
    </div>     
        </div> 
        <div className="flex justify-center gap-2 mt-4">
        <button type="button "className="bg-red-700 text-gray-200 font-quicksand font-bold px-10 hover:bg-red-800 p-4 rounded-xl" onClick={updateData} >Update</button>
        <button type="button" className="px-10  bg-red-700 rounded-xl text-gray-200 font-quicksand font-bold" onClick={()=>navigate('/main')}>Return home </button>
        </div>
        
    </div>
    
        
    );
}

export default Edit;