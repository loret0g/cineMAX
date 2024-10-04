import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Carousel from 'react-bootstrap/Carousel';

function CarouselLastMovies() {
    const [lastMovies, setLastMovies] = useState([])

    useEffect (()=>{

       getcarouselMovie()

    }, []) 
    const getcarouselMovie = async() =>{

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_EXTERNAL_API_URL}/movie/upcoming`, 
            {
              params: {
                api_key: import.meta.env.VITE_API_KEY,
                language: "en-US"
              }
            }
          )
          setLastMovies(response.data.results)
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className='carousel-cnt'>
      <div id='coming-soon'><p>Coming soon</p></div>
    <Carousel>
      {lastMovies.map((eachLastMovie) => (
        <Carousel.Item key={eachLastMovie.id} interval={3000} id="cnt-carousel">
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w500${eachLastMovie.backdrop_path}`}
            alt={eachLastMovie.title}
            style={{ height: '500px'}}
          />
          <Carousel.Caption>
            <h3>{eachLastMovie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
     </Carousel>
    </div>
    
  )
}

export default CarouselLastMovies