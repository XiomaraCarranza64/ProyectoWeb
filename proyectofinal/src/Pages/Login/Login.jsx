import { EyeIcon } from '@heroicons/react/outline'
import { useRef } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {appServices} from '../../Services/app.services';
 
const  Login = ()=>{

   const userInput = useRef(null);
   const passInput = useRef(null);
   const newSesion = useNavigate();
   
   const Submit= async (e)=>
   {

      e.preventDefault();
      const userName = userInput.current.value;
      const passWord = passInput.current.value;
      
      if(!passWord||!userName){
         toast('Please type your username and password',{type: "warning"})
      }else {
          try{
            const response= await appServices.Login(userName , passWord)
            if (response){
                 appServices.WhoamI()
                 newSesion('/main')
            }
         }catch(error){
            return ; }
        
          
      }
   }
   
   
   return (
     <div className="bg-gradient-to-b from-pink-200 to-pink-600 w-full h-screen">
        <ToastContainer/>
      <div className="flex flex-col justify-center bg-white p-8 inset-x-px my-32 mx-12 absolute rounded-2xl md:mx-60 lg:mx-80" onSubmit={Submit}>
        <div className="flex justify-center gap-4">
           <h1 className="text-gray-600 text-3xl font-quicksand font-bold text-center" > Double Vision   </h1>
           <EyeIcon className="w-10 text-pink-700 "/>
        </div>
       <h2 className="text-center text-gray-400 font-quicksand font-bold">Where everything starts</h2>
       <input  className="mt-10 my-6  h-10 border-gray-600 border-2 rounded-xl mx-4  md:mx-12 " type="text" placeholder=" username" ref={userInput}></input>
        <input  className="mt-1 my-8 h-10  border-gray-600 border-2 rounded-xl mx-4  md:mx-12" type="text" placeholder=" password" ref={passInput} ></input>
        <button type="submit" className="bg-pink-500 p-4 rounded-xl text-white font-bold mx-12   hover:bg-pink-700" onClick={Submit}>Iniciar Sesion</button>
      </div>
     </div>


   )




}


export default Login;