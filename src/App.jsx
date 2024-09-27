import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import { Routes, Route } from "react-router-dom";
import MovieDetails from './pages/MovieDetails'
import WatchList from './pages/WatchList'
import About from './pages/About'


function App() {
  console.log(import.meta.env.VITE_SERVER_URL)

  return (
    <>
      <Navbar/>

      {/* <Homepage/> */}
    
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/movie/:movieId' element={<MovieDetails/>}/>
        <Route path='/watchlist' element={<WatchList/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
