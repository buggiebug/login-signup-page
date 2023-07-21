import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import UseUserContext from './context/UseUserContext'
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';

function App() {
  return (
    <>
      <UseUserContext>
        <BrowserRouter>
          <Navbar/>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/*' element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
      </UseUserContext>
    </>
  )
}

export default App;