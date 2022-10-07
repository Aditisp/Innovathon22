
import './App.css';
import Header from "./components/Header";
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Uploads from './components/Uploads';
import Uploads3 from './components/mentor/Uploads3';
import Card from './components/Card';
import Details from './components/Details';
import Submit from './components/Submit';
import Collab from './components/Collab';
import M_Login from './components/mentor/M_Login';
import MProfile from './components/mentor/MProfile';
import Card2 from './components/mentor/Card2';
import Details2 from './components/mentor/Details2';
import Home from './components/Home';

import User from './components/User';
import {useNavigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
   <Router>

    <Routes>
    <Route path="/register" element={<Registration/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/upload" element={<Uploads/>} />
    <Route path="/card" element={<Card/>} />
    <Route path="/card2" element={<Card2/>} />
    <Route path='/' element={<Home/>} />
    <Route path="/details/:id" element={<Details />} />
    <Route path="/details2/:id" element={<Details2 />} />
    <Route path='/user/:id' element={<User/>}/>

      <Route path="/submitted/:id" element={<Submit />} />
      <Route path="/collab" element={<Collab />} />
      <Route path="/mlogin" element={<M_Login/>} />
      <Route path="/mprofile" element={<MProfile/>} />
      <Route path="/mupload" element={<Uploads3/>} />
    </Routes>
    </Router>
    </>)
}

export default App;
