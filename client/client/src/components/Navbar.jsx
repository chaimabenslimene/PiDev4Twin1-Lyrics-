import React, { useState, useEffect, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from 'jwt-decode';
import Styles from './styles.module.css';
const Navbar = () => {
 // const [ user , setUser] = useState({});
  const location = useLocation();
  const { user , setUser} = useContext(AuthContext);
  
    


  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout').then((response) => {
      if (response.ok) {
        console.log('Déconnexion réussie');
        // Rediriger vers la page de connexion
        window.location.href = '/login';
      } else {
        console.error('Erreur lors de la déconnexion');
      }
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                {location.pathname !== '/register' &&
                  location.pathname !== '/login' &&
                  location.pathname !== '/' && user !== null && (
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/UserProfile"
                    >
                      Profile
                    </NavLink>
                  )}
              </li>
            </ul>

            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="#">
             Bus Ticket Reservation
            </NavLink>

            {/* -------------------------------------------------------- */}
            {!user ? (
              <NavLink
                to="/login"
                className="btn btn-outline-primary ms-auto px-4 rounded-pill"
              >
                <i className="fa fa-sign-in me-2"></i> Login
              </NavLink>
            ) : (
              <NavLink
                to="/logout"
                className="btn btn-outline-primary ms-auto px-4 rounded-pill"
              >
                <i className="fa fa-sign-in me-2"></i> Logout
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/register"
                className="btn btn-outline-primary ms-2 px-4 rounded-pill"
              >
                <i className="fa fa-sign-in me-2"></i> Register
              </NavLink>
            )}
            {/* -------------------------------------------------------- */}

            {location.pathname !== '/register' &&
              location.pathname !== '/login' &&
              location.pathname !== '/' && user !== null && (
                
                  <div  >
                {/*   <img
                    src="profile-image.png"
                    alt="UProfile"
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                  />
                  style={{ color: 'gray'}} */}
                  <h4 className="username"> {user.username} </h4> 
                  </div>
                  
                  
                )
              }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
