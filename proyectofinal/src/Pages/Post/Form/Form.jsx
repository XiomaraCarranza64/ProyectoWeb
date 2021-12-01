import { PhotographIcon,SparklesIcon,DocumentTextIcon} from "@heroicons/react/outline"
import {useRef, useEffect ,useState} from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import {appServices} from '../../../Services/app.services'


const Form=()=>{

    const titleInput = useRef(null);
    const desInput = useRef(null);
    const imageInput =useRef(null);
    const [title,setTitle] = useState("")
    const [description,setDescription]= useState("")
    const [image,setImage] =useState("")


    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect((e)=>{
        if (!token||role ==="user")
        navigate('/')
        

    },[])

    async function post() {
        try {
            const post = await appServices.CreatePost(title,description,image);
               if (post) 
               {
                   toast('Post Created',{type:'success'})
                   navigate('/main')
               }
           
            } catch(err) {
            console.log(err.response);
        }
    }

    const createPost =()=>{
       
        
        setTitle(titleInput.current.value);
       setDescription(desInput.current.value);
       setImage(imageInput.current.value);

        console.log(image)

        if(!title||!description){
            toast('Please enter a title and description to the post',{type: "warning"});
           
            
        }else {
           post();

        }

    }
     

 return (
     <div className="bg-gradient-to-l from-green-300 to-green-600 h-screen">
          <ToastContainer/>
         <div className="flex flex-col justify-center gap-2">
         <h1 className="font-quicksand  text-gray-200 text-3xl font-bold mt-20 text-center">Create new post</h1>
         <h2 className="font-quicksand  text-gray-100 text-lg  text-center">have some new idea?</h2>
         </div>
         
         <div className="flex flex-col justify-center gap-6 ">
           <div className="flex justify-center gap-2 ">
              <SparklesIcon className="w-10 mt-20 text-green-900"/>
             <input type="text" placeholder="Title" className="mt-20 py-4 px-10 rounded-xl md:px-32 " ref={titleInput}></input>
            </div>
           <div  className="flex justify-center gap-2">
              <DocumentTextIcon className="w-10 text-green-900"/>
              <input type="text" placeholder="Description" className="py-4 px-10 rounded-xl md:px-32" ref={desInput}></input>
           </div>
           <div  className="flex justify-center gap-2 ">
                 <PhotographIcon className="w-10 text-green-900"/>
                 <input type="text" placeholder="URL image (opt)" className="py-4 px-10 rounded-xl md:px-32"ref={imageInput}></input>
           </div>
           
           <button type="button" className="py-4 mx-12 mt-4 bg-green-700 rounded-xl text-gray-100 font-quicksand font-bold  text-center hover:bg-green-800 " onClick={createPost}>Create!</button>
          
      </div>


     </div>
 )



}
export default Form