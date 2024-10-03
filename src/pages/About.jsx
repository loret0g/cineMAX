import React from "react";
import dev1 from "../assets/dev1.png"
import dev2 from "../assets/dev2.png"

import imgAbout from "../assets/img-about.png"

function About() {
  return (
    <div className="about-page">

      <div className="about-description">
        <h1 className="title">About CineMAX</h1>
        <div className="cnt-about-description">
          <img src={imgAbout} alt="Cinematic Clapperboard" className="about-img" />
          <p>
            CineMAX es tu compañero perfecto para gestionar y descubrir películas.
            Nuestra plataforma permite a los usuarios agregar películas a una lista de
            seguimiento personalizada, marcar sus favoritas y añadir comentarios para
            recordar sus impresiones. Además, podrás valorar las películas que has visto
            con un sistema de estrellas, y navegar por géneros o listas de estrenos recientes.
            Con CineMAX, organizar tu amor por el cine nunca fue tan fácil y divertido.
          </p>
        </div>
        
      </div>

      <h1 className="title">CineMAX developers</h1>

      <div className="developers-container">
        <div className="developer-card">
          <img
            src={dev1}
            alt="Cristo"
            className="profile-picture"
          />
          <h3>Cristo</h3>
          <p>
            Full-stack Developer with a passion for React and JavaScript.
          </p>
          <div className="links">
            <a
              href="https://www.linkedin.com/in/cristina-aguilera-briones/"
              target="_blank"
              className="linkedin-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/CristinaAguileraBriones"
              target="_blank"
              className="github-link"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="developer-card">
          <img
            src={dev2}
            alt="photo dev1"
            className="profile-picture"
          />
          <h3>Loreto</h3>
          <p>
            Full-stack Developer focused on UX/UI and front-end technologies.
          </p>
          <div className="links">
            <a
              href="https://www.linkedin.com/in/loreto-garde/"
              target="_blank"
              className="linkedin-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/loret0g"
              target="_blank"
              className="github-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
