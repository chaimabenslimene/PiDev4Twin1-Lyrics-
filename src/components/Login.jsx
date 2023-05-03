import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './styles.module.css';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import About from './About';
import Logout from './logout.jsx';
import Register from './Register';
import Forgetpassword from './Forgetpassword';
import ResetPassword from './ResetPassword';
import Protectedroute from './ProtectedRoutes';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ax from '../lib/axios';
import AuthContext from '../contexts/AuthContext';

const authenticateWithGoogle = async () => {
  //const navigate = useNavigate();
  const CLIENT_ID =
    '92521976574-ertme255melugj3bvs718ou98nmgqncd.apps.googleusercontent.com';
  const REDIRECT_URI = 'http://localhost:3000'; // votre URL de redirection

  const client = new OAuth2Client(CLIENT_ID);

  window.open(
    client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],

      redirect_uri: REDIRECT_URI,
    })
  );
};

const googleAuth = () => {
  window.open();
};
const facAuth = () => {
  window.open('http://localhost:5000/api/auth/facebook');
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOauth, setIsOauth] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  //const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/', { replace: true });
  }, [user]);

  const handleInput = (event) => {
    setEmail(event.target.value);
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // ------------------------------------------------------
      const res = await ax.post('/auth/login', {
        email,
        password,
      });
      login(res.data);
      // --------------------------------------------------------

      localStorage.setItem('token', res.data.token);
      setIsOauth(true);
      // navigate('/UserProfile');
    } catch (error) {
      // ---------------------------------------------------------
      toast.warn('user not found !');
      // -------------------------------------------------------
      console.log(error);
    }
  };

  if (isOauth) {
    return <p> you are logged in </p>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome back </h1>
            <p className="lead text-center ">Enter Your Credentials to login</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/register"
              className="btn btn-outline-light
               rounded-pill pb-2 w-50"
            >
              Sign up
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Sign in</h1>
            {/*  <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                
                <div class="col-md-6 p-4 ps-md-0">
                  <NavLink to="/forgetPassword" class="stretched-link">Forget password ?</NavLink>
                  
              </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 mt-4 rounded-pill">Login </button>
            </form> */}

            <form onSubmit={handleSubmit}>
              <div class="mb-3">
               

                <div className="mb-3">
            <label htmlFor="email" className="form-label">
            Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
             
            />
</div>

<div className="mb-3">
            <label htmlFor="password" className="form-label">
            Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
             
            />
</div>


               
                <div class="col-md-6 p-4 ps-md-0">
                  <NavLink to="/forgetPassword" class="stretched-link">
                    Forget password ?
                  </NavLink>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-50 mt-4 rounded-pill"
                >
                  Login
                </button>
              </div>
            </form>
            <br></br>
            <div class="container">
              <div class="row">
                <div class="col">
                  <button
                    className={Styles.google_btn}
                    onClick={authenticateWithGoogle}
                  >
                    <img src="./image/google1.png" alt="google icon" />
                    <span>Sing in with Google</span>
                  </button>
                </div>
                <div class="col">
                  <button className={Styles.google_btn} onClick={facAuth}>
                    <img src="./image/facebook1.png" alt="google icon" />
                    <span>Sing in with Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
