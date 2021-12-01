import { useState ,useEffect} from "react"; 
import { useNavigate } from "react-router";
import {appServices} from '../../../Services/app.services';
import { ArchiveIcon } from '@heroicons/react/solid';
import Post from '../PostCard'


const  Mine =()=>{
    
    const [post, setPost] = useState();
    const [page, setPage] = useState(0);
    const [favs, setFavs] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    
    useEffect(()=>{
        async function fetchPosts() {
          try {
            const posts = await appServices.GetOwn(page, 20);
            const data= await appServices.GetAllFav();
            await setPost(posts);
            await setFavs(data);
             
             
          } catch(err) {
              console.log(err.response);
          }
      }
      
        if (!token||role ==="user")
          navigate('/');
        else
          fetchPosts();
       },[page])
      
      
       
    
    
    return (
       <div className="bg-gradient-to-b from-yellow-200 to-yellow-500 w-full min-h-screen">
           
        <div className="flex justify-center gap-4">
        <h1 className="text-center pt-10 text-gray-500 font-quicksand text-3xl font-bold">My Posts</h1>
        <ArchiveIcon className="w-10 mt-10  text-yellow-700"/>
        </div>
        <h2 className="text-gray-400 text-center font-quicksand mt-2 font-bold">Check the new stuff!</h2>
        
        <div className="flex flex-col  mt-48 mx-20 justify-center md:flex-row md:flex-wrap md:justify-between md:gap-8">
        
        {
          post && favs && post.map((post)=>(
            <Post post={post} favs={favs}/>
          ))
        }
         
        </div>
         <button type="button" className="p-2 mt-10 ml-2 bg-yellow-700 rounded-xl text-gray-200 font-quicksand font-bold" onClick={()=>navigate('/main')}>Return home </button>
       </div>
    )
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   }
   export default Mine;