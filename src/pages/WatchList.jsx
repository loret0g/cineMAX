import { useState, useEffect} from "react"
import FormAddComment from '../components/FormAddComment'
import axios from "axios"

function WatchList() {
  const [addedMovie, setAddedMovie] = useState()

  const [userRating, setUserRating] = useState(0); //  el rating que da el usuario
  const [stars, setStars] = useState([]); // para almacenar las estrellas
  
  
  useEffect(()=>{
    getWatchList()

  }, [])

  const getWatchList = async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/movies`)
      setAddedMovie(response.data)
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleAddWatched = async(movieId, movieWatched) => {
    try {
      const updatedWatchedStatus = !movieWatched
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`, {watched: updatedWatchedStatus})
      getWatchList()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddFav = async(movieId, movieFav) => {
    try {
      const updatedFavStatus = !movieFav
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`, {liked: updatedFavStatus})
      getWatchList()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteWatchList = async(movieId) => {

    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`)
      getWatchList()
    } catch (error) {
      console.log(error)
    }
  }

  // Función para manejar el clic en las estrellas
  const handleRatingClick = (rating) => {
    setUserRating(rating); // Cambia el valor del rating cuando se hace clic
    updateRatingInDatabase(rating)
  };

  const renderStars = () => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      starElements.push(
        <span
          key={i}
          onClick={() => handleRatingClick(i)} // Establece el rating cuando haces clic en la estrella
          style={{
            color: userRating >= i ? "gold" : "gray",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          ★
        </span>
      );
    }
    setStars(starElements); // Almacena las estrellas en el estado
  };

  useEffect(() => {
    renderStars(); // Cada vez que el rating cambia, vuelve a renderizar las estrellas
  }, [userRating]);

  const updateRatingInDatabase = async (rating) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`,
        { rating }
      );
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div>
     {addedMovie === undefined ? (<h3>...Cargando</h3>) : 
    addedMovie.map((eachMovie, index)=>{
      return (
        <div key={index}>
          <h1>{eachMovie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`} alt="imagen-pelicula" />
          <br />
          <button onClick={() => handleAddFav(eachMovie.id, eachMovie.liked)}>{eachMovie.liked ? "me gusta" : "agregar a me gusta"}</button>
          <button onClick={() => handleAddWatched(eachMovie.id, eachMovie.watched)}>{eachMovie.watched ? "ICONO VISTO" : "ICONO NO VISTO"}</button>
          <button onClick={() => handleDeleteWatchList(eachMovie.id)}>Delete from WatchList</button>
          
          {/* Rating */}
          <div>
              <h3>Rate this movie:</h3>
              
              <div>{stars}</div>

              <p>Your rating: {userRating} / 5</p>
          </div>
          
          <p>{eachMovie.overview}</p>
          
          <p>Comment:</p>

          <FormAddComment getWatchList={getWatchList} movieId={eachMovie.id} currentComment={eachMovie.comment}/>
          
        </div>

      )
      
    

    })}


    </div>

  )
}

export default WatchList