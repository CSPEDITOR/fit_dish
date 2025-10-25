import React from 'react'
import './App.css'
import Home from './Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' end />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
