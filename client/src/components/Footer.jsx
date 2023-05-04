import React from "react";
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (

    <div>
      <footer className="footer text-white bg-primary">
        <div className="container">
          <footer className="py-5">
            <div className="row">
              <div className="col-3">
                <h4>BUS TICKET RESERVATION </h4>
              </div>

              

              <div className="col-2">
                <h5>Section</h5>
                <ul className="nav flex-column">
                <NavLink className="nav-link p-0 text-white" to="/">
                  Home
                </NavLink>
                 
                  <NavLink className="nav-link p-0 text-white" to="/voyage">
                  Services
                </NavLink>
                 
                <NavLink className="nav-link p-0 text-white" to="/about">
                  About
                </NavLink>
                </ul>
              </div>

              <div className="col-4 offset-1">
               
               
              </div>
            </div>

            <div className="d-flex  px-5 mt-4 border-top">
              <p className="ms-auto">© 2023 Company, Inc. All rights reserved.</p>
              
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );

}
export default Footer;