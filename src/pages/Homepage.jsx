import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Searchbar from "../components/Searchbar";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Homepage() {
  const [allMovies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState([])        // Saber todos los géneros con llamada a la API
  const [selectGenre, setSelectGenre] = useState()  // Género que selecciona el usuario

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getMovies();
    getGenre()
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movie/top_rated`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            // page: 1 // cambiar el número de la página para obtener más resultados
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenre = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/genre/movie/list`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        })
      setGenre(response.data)
    } catch (error) {
      console.log(error)
    }
  }
    
  const searchMovies = async () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      getMovies(); // Si el campo de búsqueda está vacío, vuelve a las películas top-rated
      return;
    }

    try {
      setIsSearching(true); // Indicamos que estamos buscando
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/search/movie`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            query: searchTerm, // El término de búsqueda
            page: 1,
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
    searchGenre(selectGenre)
  }, [selectGenre])

  const searchGenre = async(genreId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/discover/movie`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          with_genres: genreId,  // Filtrar por género
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Searchbar searchTerm={searchTerm} handleSearchTermChange={setSearchTerm} genre= {genre} setSelectGenre={setSelectGenre}/>
      <div id="homepage">
      {allMovies === undefined ? (
        <h3>...Cargando</h3>
      ) : allMovies.length === 0 ? (
        <h3>No results found for "{searchTerm}"</h3>
      ) : (
        allMovies.map((eachMovie) => {
          // Mapear los genre_ids a los nombres de los géneros
          const movieGenres = eachMovie.genre_ids.map(genreId => {
            const foundGenre = genre.genres?.find(g => g.id === genreId);
            return foundGenre ? foundGenre.name : 'Unknown';
          });


          return (
            <Link to={`/movie/${eachMovie.id}`} key={eachMovie.id}>
              <Card style={{ width: '18rem' }} id="movie-card">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`} alt={eachMovie.title}/>
                <Card.Body>
                  <Card.Title>{eachMovie.title}</Card.Title>
                  <h5 id="release-date">{eachMovie.release_date.substring(0, 4)}</h5>
                  <span className="genres">{movieGenres.join(", ")}</span>
                  <Card.Text  className="card-text">{eachMovie.overview}</Card.Text>

                </Card.Body>
              </Card>
            </Link>
          );
        })
      )}
    </div>
    </>
  );
}

export default Homepage;
