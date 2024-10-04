import './App.css'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import { Routes, Route } from "react-router-dom";
import MovieDetails from './pages/MovieDetails'
import WatchList from './pages/WatchList'
import About from './pages/About'
import NotFound from './pages/NotFound'
import MyNavbar from './components/MyNavbar';


function App() {
  return (
    <>
    <MyNavbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/movie/:movieId' element={<MovieDetails/>}/>
        <Route path='/watchlist' element={<WatchList/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App