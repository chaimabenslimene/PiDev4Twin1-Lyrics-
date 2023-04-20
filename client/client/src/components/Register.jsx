import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAskingPromotion, setIsAskingPromotion] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // ---------------------------------------------
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user]);
  // ------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      window.alert('Passwords do not match');
      return;
    }
    if (password.length != 8) {
      alert("Le password doit être exactement de 8 caractères.");
      return false;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/users/', {
        username,
        email,
        password,
        isAdmin,
        isAskingPromotion,
      });
      const response = await axios.post(
        'http://localhost:5000/api/users/verifyy',
        { email }
      );
      console.log(response.data);
      console.log(res.data);
      window.alert(
        'User created and a verification mail has been sent to you '
      );
      
    } catch (error) {
      console.error(error);
      console.error(error);
      window.alert('Problem while registering');
    
    }
  };

  const handleInput = (event) => {
    setUsername(event.target.value);
    setEmail(event.target.value);
    setPassword(event.target.value);
    setIsAdmin(event.target.checked);
    setIsAskingPromotion(event.target.checked);
  };
  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})|^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})|^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
    );
  
    if (strongRegex.test(newPassword) && newPassword.length === 8) {
      setPasswordStrength('fort');
    } else if (mediumRegex.test(newPassword)) {
      setPasswordStrength('moyen');
    } else {
      setPasswordStrength('faible');
    }
  };
 

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row  justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello , Friend</h1>
            <p className="lead text-center ">Enter Your details to register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light
               rounded-pill pb-2 w-50"
            >
              Sign in
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Sign up</h1>
       
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <div className="mb-3">
            <label htmlFor="username" className="form-label">
            Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username*"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
              </div>
                <div className="mb-3">
            <label htmlFor="email" className="form-label">
            Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
             
            />
</div>

            <div className="mb-3">
            <label htmlFor="Password" className="form-label">
            Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password*"
              required
              oninvalid="this.setCustomValidity('Le code est obligatoire et doit être de 8 caractères.')"
              value={password}
              onChange={handleChangePassword}
            />
      

                  {passwordStrength === 'fort'  && (
                    <p style={{ color: 'green' }}>Strong password</p>
                  )}
                  {passwordStrength === 'moyen' && (
                    <p style={{ color: 'orange' }}>Medium password</p>
                  )}
                  {passwordStrength === 'faible' && (
                    <p style={{ color: 'red' }}>Weak password</p>
                  )}
                </div>

                <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirmPassword*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
                <br></br>
                <div>
                  <label>
                    Souhaitez-Vous un Admin:
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => {
                        setIsAdmin(e.target.checked);
                        setIsAskingPromotion(e.target.checked);
                      }}
                    />
                  </label>
                </div>
          
                <button type="submit" name="submit" className="btn btn-primary w-50 mt-4 rounded-pill" >Register</button>

              </div>
              <div>
              <button
                  type="submit"
                  className="btn btn-primary w-50 mt-4 rounded-pill"
                >
                  Ressend password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
