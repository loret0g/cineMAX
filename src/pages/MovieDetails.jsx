import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"


function MovieDetails() {
  const [movie, setMovie] = useState ()

  const params = useParams()

  useEffect (() => {
    
    getMovie()

  }, [])

  const getMovie = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/movie/${params.movieId}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        }
      });
      console.log(response.data)
      setMovie(response.data)
    } catch(error) {
        console.log(error)
    }
  }

  return (
    <>
    <div>MovieDetails</div>

    <div>
      {
        movie===undefined ? (
          <h3>...Cargando</h3>
         ) : (
        <div> 
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.imagen} />
          <br></br>
          <button>Agregar a WatchList</button>
          <h2>{movie.genres.map((eachMovie, index)=>{
          return (
           
            <span key={index}>{eachMovie.name}</span>
          )
            
            
          })}</h2>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <h2>{movie.vote_average}</h2>
        </div>
        )
      }

    </div>
    </>
  )
}

export default MovieDetails