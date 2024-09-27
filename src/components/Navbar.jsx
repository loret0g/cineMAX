import { Link } from "react-router-dom"

function Navbar() {

  
  return (
    <nav>
      <Link to="/"><button>CineMAX</button></Link>
      <Link to="/watchlist"><button>WatchList</button></Link>

    </nav>
    
  )
}

export default Navbar