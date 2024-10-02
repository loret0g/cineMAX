import { useState, useEffect} from "react"
import FormAddComment from '../components/FormAddComment'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import SyncLoader from "react-spinners/SyncLoader";


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
    <div id="watchlist-container">
     {addedMovie === undefined ? (<h3><SyncLoader color="#6D36D4" /></h3>) : 
    addedMovie.map((eachMovie, index)=>{
      return (
        <div key={index} className="watchlist-card">
          <h1>{eachMovie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`} alt="imagen-pelicula" />
          <br />
          <div id="labels-watchlist">
              <button onClick={() => handleDeleteWatchList(eachMovie.id)}>Delete from WatchList</button>
            <div className="watchlist-icons">
              <span onClick={() => handleAddFav(eachMovie.id, eachMovie.liked)}>{eachMovie.liked ? <i className="fas fa-heart" style={{ color: "red", fontSize: "24px" }}></i>  : <i className="far fa-heart" style={{ color: "gray", fontSize: "24px" }}></i>}</span>
              
              <span onClick={() => handleAddWatched(eachMovie.id, eachMovie.watched)}>
                {eachMovie.watched ? (
                  <i className="fas fa-eye" style={{ color: "green", fontSize: "24px" }}></i>
                ) : (
                  <i className="fas fa-eye-slash" style={{ color: "gray", fontSize: "24px" }}></i>
                )}
              </span>
            </div>  
          </div>
          
          
          {/* Rating */}
          <div>              
              <div>{stars}</div>

              <p>Your rating: {userRating} / 5</p>
          </div>
          
          {/* <p>{eachMovie.overview}</p> */}
          
          <p>Comment:</p>

          <FormAddComment getWatchList={getWatchList} movieId={eachMovie.id} currentComment={eachMovie.comment}/>
          
        </div>

      )
      
    

    })}


    </div>

  )
}

export default WatchList