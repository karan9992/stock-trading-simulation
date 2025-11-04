import { useState } from 'react'

import './App.css'
import Portfoilo from './pages/Portfoilo'
import Market from './pages/Market'
import { Link, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import News from './pages/News'
import About from './pages/About'


function App() {


  return (
    <>

      {/* <Portfoilo /> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/market' element={<Market />} />
        <Route path='/portfolio' element={<Portfoilo />} />
        <Route path='/news' element={<News />} />
        <Route path='/about' element={<About />} />


        {/* <Route path='/home' element={<Home />} /> */}

      </Routes>
      
      



    </>
  )
}

export default App
