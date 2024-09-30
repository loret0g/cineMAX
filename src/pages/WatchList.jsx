import { useState, useEffect } from "react"
import FormAddComment from '../components/FormAddComment'
import axios from "axios"

function WatchList() {
  const [addedMovie, setAddedMovie] = useState()
  console.log(addedMovie)
  
  useEffect(()=>{
    getWatchList()

  }, [])

  const getWatchList = async () =>{
    try {
      const response = await axios.get("http://localhost:5005/movies")
      console.log(response.data)
      setAddedMovie(response.data)
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleAddWatched = async(movieId, movieWatched) => {
    try {
      const updatedWatchedStatus = !movieWatched
      await axios.patch(`http://localhost:5005/movies/${movieId}`, {watched: updatedWatchedStatus})
      getWatchList()
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div>
     {addedMovie === undefined ? (<h3>...Cargando</h3>) : 
    addedMovie.map((eachMovie, index)=>{
      return (
        <div key={index}>
          <h1>{eachMovie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`} alt="imagen-pelicula" />
          <button onClick={() => handleAddWatched(eachMovie.id, eachMovie.watched)}>{eachMovie.watched ? "ICONO VISTO" : "ICONO NO VISTO"}</button>
          <p>{eachMovie.overview}</p>
          <p>Comment: {eachMovie.comment}</p>
          {/* <div>
            {comments === undefined ? (<h3>No hay comentarios</h3>) : (
                // <p>{comments}</p>
                <p>tu  madre</p>
              
            )}
            
          </div> */}

          <FormAddComment getWatchList={getWatchList} movieId={eachMovie.id}/>
          
        </div>

      )
      
    

    })}


    </div>

  )
}

export default WatchList