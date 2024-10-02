import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Header.module.scss";

const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav>
        {isAuthenticated ? (
          <>
           <Link to="/products/create" className={styles.link}>
              Crear Producto
            </Link>
            <Link to="/user" className={styles.link}>
              Cambiar Password
            </Link>
            <button onClick={handleLogout} className={styles.link}>
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Header;
