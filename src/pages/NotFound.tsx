import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.module.scss";
const NotFound: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1>404</h1>
        <h2>¡Ups! Página no encontrada</h2>
        <p>
          Lo sentimos, pero la página que buscas no está disponible o ha sido
          eliminada.
        </p>
        <Link to="/login" className="home-button">
          Volver al Inicio
        </Link>

        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Error 404"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
