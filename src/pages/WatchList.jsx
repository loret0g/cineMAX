import { useState, useEffect} from "react"
import FormAddComment from '../components/FormAddComment'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import noData from "../assets/nodata.gif"

import SyncLoader from "react-spinners/SyncLoader";


function WatchList() {
  const [addedMovie, setAddedMovie] = useState()
  const [filteredMovies, setFilteredMovies] = useState();

  // const [favourites, setFavouites] = useState()
  // const [watched, setWatched] = useState()

  useEffect(()=>{
    getWatchList()
  }, [])

  const getWatchList = async () =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/movies`)
      setAddedMovie(response.data)
      setFilteredMovies(response.data)
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

  const handleRatingClick = async (movieId, rating) => {
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`, { rating });
      getWatchList();
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (movieId, movieRating) => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      starElements.push(
        <span
          key={i}
          onClick={() => handleRatingClick(movieId, i)} // Establece el rating cuando haces clic en la estrella
          style={{
            color: movieRating >= i ? "gold" : "gray",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          ★
        </span>
      );
    }
    return starElements;
  };


  const handleFilterFav = () => {
    const favMovies = addedMovie.filter((eachMovie) => eachMovie.liked);
    console.log(favMovies)
    setFilteredMovies(favMovies);
  }

  const handleFilterWatched = () => {
    const watchedMovies = addedMovie.filter((eachMovie) => eachMovie.watched);
    setFilteredMovies(watchedMovies);
  }

  const handleShowAllMovies = () => {
    setFilteredMovies(addedMovie);
  }
  
  return (
    <>
  <div >
    <button onClick={handleFilterFav} className="btn-watchlist-page" >Favorites movies</button>
    <button onClick={handleFilterWatched} className="btn-watchlist-page">Watched movies</button>
    <button onClick={handleShowAllMovies} className="btn-watchlist-page">My WatchList</button>
  </div>

  <div id="watchlist-container">
    {/* Condicional: Si no hay películas, muestra la imagen */}
    {filteredMovies && filteredMovies.length === 0 ? (
      <>
      <img src={noData} alt="No movies available" /> 
      <div id="no-data-found">
        <h2>Where are yours movies?</h2>
        <h2>You should add here some of them</h2>
      </div>
      </>
    ) : (
      /* Si hay películas, mapeamos para mostrarlas */
      filteredMovies === undefined ? (
        <h3><SyncLoader color="#6D36D4" /></h3>
      ) : (
        filteredMovies.map((eachMovie, index) => (
          <div key={index} className="watchlist-card">
            <h1>{eachMovie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`}
              alt="imagen-pelicula"
            />
            <br />
            <div id="labels-watchlist">
              <button onClick={() => handleDeleteWatchList(eachMovie.id)}>
                Delete from WatchList
              </button>
              <div className="watchlist-icons">
                <span
                  onClick={() =>
                    handleAddFav(eachMovie.id, eachMovie.liked)
                  }
                >
                  {eachMovie.liked ? (
                    <i
                      className="fas fa-heart"
                      style={{ color: "red", fontSize: "24px" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-heart"
                      style={{ color: "gray", fontSize: "24px" }}
                    ></i>
                  )}
                </span>

                <span
                  onClick={() =>
                    handleAddWatched(eachMovie.id, eachMovie.watched)
                  }
                >
                  {eachMovie.watched ? (
                    <i
                      className="fas fa-eye"
                      style={{ color: "green", fontSize: "24px" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-eye-slash"
                      style={{ color: "gray", fontSize: "24px" }}
                    ></i>
                  )}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <div>{renderStars(eachMovie.id, eachMovie.rating)}</div>
              <p>Your rating: {eachMovie.rating} / 5</p>
            </div>

            <p>Comment:</p>

            <FormAddComment
              getWatchList={getWatchList}
              movieId={eachMovie.id}
              currentComment={eachMovie.comment}
            />
          </div>
        ))
      )
    )}
  </div>
</>

  )
}

export default WatchList