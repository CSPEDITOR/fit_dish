import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' end />
          <Route element={<Login/>} path='/login' end />
          <Route element={<Signup/>} path='/signup' end />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
