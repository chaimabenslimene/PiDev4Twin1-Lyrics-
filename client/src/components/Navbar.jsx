import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  // ----------------------------------------
  const { user } = useContext(AuthContext);
  // ----------------------------------------

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
            </ul>
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="#">
              BTR
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
