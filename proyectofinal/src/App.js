
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Edit from './Pages/Post/Edit/Edit'
import Main from './Pages/Main/MainLobby';
import Form from './Pages/Post/Form/Form';
import Own from './Pages/Post/Mine/Mine';
import Favorite from './Pages/Post/Favorite/Favorite';
import NotFound from './Pages/NotFound/NotFound';


const App =() => (
  <Router>
   <Routes>
      <Route exact path ="/" element={<Login/>}/>
      <Route exact path ="/main" element={ <Main />}/>
      <Route exact path ="/newpost" element={<Form/>}/>
       <Route exact path = "/show" element={<Own />}/>
      <Route exact path ="/update/:idpost/:active" element={<Edit/>}/>
      <Route path="*" element={<NotFound />}/>
      <Route exact path ="/favs" elements ={<Favorite/>}/>
   </Routes>
  </Router>
)



export default App;