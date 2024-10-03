import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Searchbar from "../components/Searchbar";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import SyncLoader from "react-spinners/SyncLoader";
import CarouselLastMovies from "../components/CarouselLastMovies";

function Homepage() {
  const [allMovies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState([]); // Saber todos los géneros con llamada a la API
  const [selectGenre, setSelectGenre] = useState(); // Género que selecciona el usuario
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getMovies();
    getGenre();
  }, [page]);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_EXTERNAL_API_URL}/movie/top_rated`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            page, // cambiar el número de la página para obtener más resultados
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenre = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_EXTERNAL_API_URL}/genre/movie/list`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        }
      );
      setGenre(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovies = async () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      getMovies(); // Si el campo de búsqueda está vacío, vuelve a las películas top-rated
      return;
    }

    try {
      setIsSearching(true); // Indicamos que estamos buscando
      const response = await axios.get(
        `${import.meta.env.VITE_EXTERNAL_API_URL}/search/movie`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            query: searchTerm, // El término de búsqueda
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchMovies(); // Buscar películas cada vez que cambia el término de búsqueda
  }, [searchTerm]);

  useEffect(() => {
    searchGenre(selectGenre);
  }, [selectGenre]);

  const searchGenre = async (genreId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_EXTERNAL_API_URL}/discover/movie`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_genres: genreId, // Filtrar por género
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      
      <CarouselLastMovies />
      <Searchbar
        searchTerm={searchTerm}
        handleSearchTermChange={setSearchTerm}
        genre={genre}
        setSelectGenre={setSelectGenre}
      />
      <div id="homepage">

        {allMovies === undefined ? (
          <SyncLoader color="#6D36D4" />
        ) : allMovies.length === 0 ? (
          <h3>No results found for "{searchTerm}"</h3>
        ) : (
          allMovies.map((eachMovie) => {
            // Mapear los genre_ids a los nombres de los géneros
            const movieGenres = eachMovie.genre_ids.map((genreId) => {
              const foundGenre = genre.genres?.find((g) => g.id === genreId);
              return foundGenre ? foundGenre.name : "Unknown";
            });

            return (
              <Link to={`/movie/${eachMovie.id}`} key={eachMovie.id}>
                <Card id="movie-card" className="text-center">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`}
                    alt={eachMovie.title}
                  />
                  <Card.Body>
                    <Card.Title>{eachMovie.title}</Card.Title>
                    <h5 id="release-date">
                      {eachMovie.release_date.substring(0, 4)}
                    </h5>
                    <span className="genres">{movieGenres.join(", ")}</span>
                    <Card.Text className="card-text">
                      {eachMovie.overview}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            );
          })
        )}
        {page > 1 ? (
          <button onClick={handlePreviousPage} className="btn-page">Anterior</button>
        ) : null}
        <button onClick={handleNextPage} className="btn-page">Siguiente</button>
      </div>
    </>
  );
}

export default Homepage;
