import Admin from './Admin/Admin';
import Post from '../Post/PostCard'
import { UserIcon ,EyeIcon} from '@heroicons/react/solid'
import { useParams } from 'react-router';
import { useEffect,useState } from "react"
import { useNavigate } from "react-router";
import {appServices} from '../../Services/app.services';


const MainLobby =()=>{
  
  const [favs, setFavs] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role')
  const [page, setPage] = useState(0);
  const [select ,isSelected] = useState(true)
  const [post,setPost] = useState()
  
  
 
 useEffect(()=>{
  async function fetchPosts() {
    try {
        const posts = await appServices.GetAll(page, 20);
        const data= await appServices.GetAllFav();
        await setPost(posts);
        await setFavs(data);
        
    } catch(err) {
        console.log(err.response);
    }
}

  if (!token)
    navigate('/');
  else
    fetchPosts();
 },[page])

 
 //Functions 

 

 const showFavs=async()=>{
   navigate('/fav')

 }
 
  const previous=()=>{
    if (page===0) 
     setPage(0)
     else{
      setPage(page-1)
      
      window.scrollTo(0, 0)
     }
     
  }
  
  const next=()=>{
      setPage(page+1);
      window.scrollTo(0, 0)
  }
 
 
  
    return (
      
    <div className="bg-gradient-to-b from-purple-200 to-purple-400 w-screen min-h-screen ">
      
      <div className=" flex  flex-row-reverse gap-2 bg-purple-600 p-2  text-gray-300 ">
        
               <UserIcon className="w-8 "/>
               <h1 className="font-quicksand font-extrabold text-lg  text-right" >{username}</h1>
      </div>
      <div className="w-2">
           {role === "admin" &&  <Admin/>}
           
      </div>
     
        <div className="flex justify-center gap-4">
           <h1 className="text-gray-600 text-4xl font-quicksand font-bold text-center mt-20" > Double Vision   </h1>
           <EyeIcon className="w-12 mt-20 text-purple-700 "/>
        </div>
        <h2 className="text-gray-400 text-xl font-quicksand font-bold text-center " > Watch from a different perpective! </h2>
      
         <div className="flex flex-col  mt-48 mx-20 justify-center md:flex-row md:flex-wrap md:justify-between md:gap-10">
        { post && favs &&
           post.map((post)=>(
              
            <Post post={post} favs={favs} />
           ))
        }
     
        
    </div>
    <div className="flex flex-col justify-center mx-20 gap-4 mt-6 p-6 md:flex-row">
         <button className="bg-purple-700 text-gray-200 p-4 text-center w-full rounded-lg hover:bg-purple-800" onClick={previous}>Previous</button>
         <button  className="bg-purple-700 text-gray-200 p-4 text-center w-full rounded-lg hover:bg-purple-800 " onClick={next}>Next</button>
        <button  className=" bg-red-500  text-gray-200 p-4 font-bold w-full rounded-xl hover:bg-red-700" onClick={()=>{appServices.Logout()}} >Log out</button>
   
    </div>
         
      </div>

      
  )



}
export default MainLobby;