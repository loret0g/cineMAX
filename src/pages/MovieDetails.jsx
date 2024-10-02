import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function MovieDetails() {
  const [movie, setMovie] = useState();
  const [popUp, setPopUp] = useState(false);
  const [isInTheWatchList, setIsInTheWatchList] = useState();

  const params = useParams();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_EXTERNAL_API_URL}/movie/${params.movieId}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        }
      );
      setMovie(response.data);
      checkMovie(response.data.title);
      console.log(response.data.title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setPopUp(true);

    if (!movie) return;

    const movieData = {
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      genres: movie.genres.map((genre) => genre.name),
      watched: false,
      liked: false,
      rating: 0,
    };

    createMovie(movieData);
    setIsInTheWatchList(true);
  };

  const createMovie = async (movieData) => {
    try {
      const response = axios.post(
        `${import.meta.env.VITE_SERVER_URL}/movies`,
        movieData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // CREAR A LA PETICIÓN A NUESTRA BDD PARA SABER SI EXISTE
  const checkMovie = async (title) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/movies`
    );
    const findMovie = response.data.find(
      (eachMovie) => eachMovie.title === title
    );

    // if(findMovie){
    //   setIsInTheWatchList(true)
    // }
  };

  return (
    <div>
      {movie === undefined ? (
        <h3>...Cargando</h3>
      ) : (
        <>
            <Toast
              onClose={() => setPopUp(false)}
              show={popUp}
              delay={3000}
              autohide
            >
              <Toast.Header style={{borderRadius: "12px",   
                position: "fixed",
                top: "80px",
                right: "43%",
                zIndex: "1000",
                backgroundColor: "rgb(36, 36, 36, 0.8)",
                color: "#fff",
                border: "2px solid #f39c12" }}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Added to WatchList!!</strong>
              </Toast.Header>
            </Toast>
          <div className="detail-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.imagen}
            />
            <br></br>

            <Row>
              {isInTheWatchList ? (
                <Button disabled>Added</Button>
              ) : (
                <Button onClick={handleAdd}>Add to WatchList</Button>
              )}
            </Row>

            <div className="genre-cnt">
              {movie.genres.map((eachMovie, index) => {
                return <span key={index}>{eachMovie.name}</span>;
              })}
            </div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <h2>{movie.vote_average}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
