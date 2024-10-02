import { NavLink } from "react-router-dom"
import logo from "../assets/cinemax.png"
function Navbar() {

  
  return (
    <nav>
      <NavLink to="/"><img src={logo} alt="logo" className="imagen"/></NavLink>
      <div className="nav-links">
        <NavLink to="/watchlist" className={({ isActive }) => isActive ? "active-link" : ""} ><h3>WatchList</h3></NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""} ><h3>About</h3></NavLink>
      </div>
    </nav>
    
  )
}

export default Navbar