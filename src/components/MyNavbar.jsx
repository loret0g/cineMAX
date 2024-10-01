import { Link } from "react-router-dom"

function Navbar() {

  
  return (
    <nav>
      <Link to="/"><button>CineMAX</button></Link>
      <Link to="/watchlist"><h3>WatchList</h3></Link>
      <Link to="/about"><h3>About</h3></Link>
    </nav>
    
  )
}

export default Navbar