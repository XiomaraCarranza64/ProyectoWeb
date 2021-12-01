import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const appServices ={
 
    Login : async(username , password)=>{
        try{
            const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/auth/signin',{username: username , password: password  });
            if(response.status=== 200)
            {
                localStorage.setItem('token',response.data.token)
                 return true;

            }
          
        }catch (error){
            
            toast('Try again!',{type: 'error'})
        }
       
    
  },
  WhoamI: async ()=>{
     
    try{
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
       const info = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/auth/whoami',config )
          
        if (info.status===200){
           localStorage.setItem('username',info.data.username)
           localStorage.setItem('role',info.data.role)
        }

    }catch(error){
      toast('Something went wrong',{type:error})
    }

  },

  GetAll: async(page,limit)=>{
      try {
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const post =await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=${limit}&page=${page}`,config)
        if (post.status===200) return post.data.data ; 
      }catch(error){
        return [];
      }
  },

  GetOne: async(id)=>{
     try{
      const token = localStorage.getItem('token')
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
       const one = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${id}` ,config)
        if(one.status===200) return one.data ;
     }catch(error){
       return [];
     }


  },
  
  GetOwn: async(page,limit)=>{
    try {
      const token = localStorage.getItem('token')
      const config = {
          headers: { Authorization: `Bearer ${token}` }
          
      };
     
      const post =await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=${limit}&page=${page}`,config)
      if (post.status===200) return post.data.data ; 
    }catch(error){
      return [];
    }
},
  
 CreatePost: async(title,description,image)=>{
    try{
      
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const data = {
      'title': title,
      'description': description,
      'image':image
  }
     
     const newPost = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create',data,config) ;
      if (newPost.status===201) return true
     
    }catch(error){
      toast('Something went wrong',{type:'error'})
      return false 
    }

 }, 

 GetAllFav: async ()=>{
   try{
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }}
      
    const favs = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/fav',config);
   
    if(favs.status===200) return favs.data;

  }catch(error){
    return [];
   }


 },

 Fav : async(id)=>{

  try{
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }}

    
    const favPost = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${id}`,null,config);
    if(favPost.status===200) {
      return true ; 
    
    }
  }catch(error){
    console.log(error.response)
    return false ;
   }

 },

 Like:  async(id)=>{

  try{
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }}

    const likePost = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${id}`,null,config);
    if(likePost.status===200) {
        
    }
  }catch(error){
    console.log(error.response)
    return false ;
   }},

 Comment:async(id,description)=>{

  try{
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }}
      const data = {
        'description': description
       
    }

    const likePost = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id}`,data,config);
    if(likePost.status===200) {
    
     return true ;
    }
  }catch(error){
    console.log(error.response)
    return false ;
   }},

   Update: async(id,title,description,image)=>{
    try{
      
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const data = {
      'title': title,
      'description': description,
      'image':image
  }
     
     const newPost = await axios.put(`https://posts-pw2021.herokuapp.com/api/v1/post/update/${id}`,data,config) ;
      if (newPost.status===200) return true
     
    }catch(error){
      toast('Something went wrong',{type:'error'})
      return false 
    }
    },

    Active:async(id)=>{
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }}
    
        const actived = await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${id}`,null,config);
        if(actived.status===200) {
            return true ;
        }
      }catch(error){
        console.log(error.response)
        return false ;
       }},
    

   

    Logout:async()=>{
        
      localStorage.removeItem('token')
      window.location.reload();
     
    }
 

   
}