import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.scss";
const NotFound: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1 className="header-error">404</h1>
        <h2>¡Ups! Página no encontrada</h2>
        <p>
          Lo sentimos, pero la página que buscas no está disponible o ha sido
          eliminada.
        </p>
        <Link to="/login" className="home-button">
          Volver al Inicio
        </Link>
      </div>
    </>
  );
};

export default NotFound;
