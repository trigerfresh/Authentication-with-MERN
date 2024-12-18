import './App.css'
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path='/resetPassword/:token' element = {<ResetPassword/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
