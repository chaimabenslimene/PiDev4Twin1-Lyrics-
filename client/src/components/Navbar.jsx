import React, { useState, useEffect, useContext } from 'react';
import { Nav,Button,Modal } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from 'jwt-decode';
import Styles from './styles.module.css';

import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartTickett from './CartTickett';
const Navbar = () => {
  // const [ user , setUser] = useState({});
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [showNav, setShowNav] = useState(false);
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCartClick = () => {
    setShow(!show);
  
  }
  useEffect(() => {}, [user]);

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

  const handleToggleClick = () => {
    setShowNav(!showNav);
  };


  return (
  <div>
  <nav className="navbar navbar-expand-lg navbar-light shadow">
    <div className="container">
      <button
        id="navbar-toggler"
        className="navbar-toggler"
        type="button"
        onClick={handleToggleClick}
      >
        <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${showNav ? 'show' : ''}`} id="navbarSupportedContent">
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
                <NavLink className="nav-link" to="/voyage">
                  Services
                </NavLink>
              </li>
            
              <li className="nav-item">
                {user &&
                  location.pathname !== '/register' &&
                  location.pathname !== '/login' && (
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

            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto"  to="#">
              BUS TICKET RESERVATION 
            </NavLink>

            <Link to='/Pannier' onClick={handleCartClick}>
            <FaShoppingCart /> 
          </Link> 

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
              user !== null && (
                <div  class="text-right px-5" style={{ color: '#5b5b5b' }} > 
                  <h5 className="username"> {user.username} </h5>
                </div>
              )} 
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
