import { Link } from "react-router-dom"
import logo from "../assets/cinemax.png"
function Navbar() {

  
  return (
    <nav>
      <Link to="/"><img src={logo} alt="logo" className="imagen"/></Link>
      <div className="nav-links">
        <Link to="/watchlist"><h3>WatchList</h3></Link>
        <Link to="/about"><h3>About</h3></Link>
      </div>
    </nav>
    
  )
}

export default Navbar