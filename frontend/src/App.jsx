import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home/Home'

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
