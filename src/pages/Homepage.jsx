import { useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import Searchbar from "../components/Searchbar";

function Homepage() {

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getMovies();
  }, [])

  const getMovies = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/movie/top_rated`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          // page: 1 // cambiar el número de la página para obtener más resultados
        }
      });
      console.log(response.data.results)
      setMovies(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="homepage">Homepage

    <Searchbar/>
  
      {movies === null ? (<h3>...Cargando</h3>) :
        movies.map((eachMovie) => {
          return (
            <Link to={`/movie/${eachMovie.id}`} key={eachMovie.id}>
              <div  id="movie-card">
                <h1>{eachMovie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`} alt={eachMovie.title} />
              
                <p>{eachMovie.overview}</p>
              </div>
            </Link>
          )
      })}

    </div>
  )
}

export default Homepage