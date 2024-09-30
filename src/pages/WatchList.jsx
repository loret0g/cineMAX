import { useState, useEffect } from "react"
import FormAddComment from './FormAddComment'
import axios from "axios"

function WatchList() {
  const [addedMovie, setAddedMovie] = useState()
  const [comments, setComments] = useState({})
  useEffect(()=>{
    showDate()

  }, [])
  const showDate = async () =>{
    try {
      const response = await axios.get("http://localhost:5005/movies")
      console.log(response.data)
      setAddedMovie(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  
  return (
    <div>
     {addedMovie === undefined ? (<h3>...Cargando</h3>) : 
    addedMovie.map((eachMovie)=>{

      return (
        <div>
          <h1>{addedMovie.title}</h1>
          <img src={`http://localhost:5005/movies${eachMovie.backdrop_path}`} alt="imagen-pelicula" />
          <p>{addedMovie.overview}</p>
          <div></div>

          <FormAddComment/>
          
        </div>

      )
      
    

    })}


    </div>

  )
}

export default WatchList