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

  // ---------------------------------------------
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user]);
  // ------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    if (strongRegex.test(newPassword)) {
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
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Register</h1>
            {/*  <form onSubmit ={handleSubmit} method="POST">
              <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input 
                type="text" 
                class="form-control"
                id="name"
                name="username"
                value={user.username}
                onChange={handleInput}
                  />
                
              </div>
              <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email"
                 class="form-control" 
                 id="exampleInputEmail1" 
                 aria-describedby="emailHelp"
                 name="email"
                 value={user.email}
                 onChange={handleInput} />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                name="password"
                value={user.password}
                onChange={handleInput}/>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">I agree terms and conditions</label>
              </div>
              <button type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">
                Register
              </button>
            </form> */}
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <div>
                  <label>
                    Username:
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      style={{ width: '400px' }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email:
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      style={{ width: '400px' }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Password:
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={password}
                      onChange={handleChangePassword}
                      style={{ width: '400px' }}
                    />
                  </label>

                  {passwordStrength === 'fort' && (
                    <p style={{ color: 'green' }}>Strong password</p>
                  )}
                  {passwordStrength === 'moyen' && (
                    <p style={{ color: 'orange' }}>Medium password</p>
                  )}
                  {passwordStrength === 'faible' && (
                    <p style={{ color: 'red' }}>Weak password</p>
                  )}
                </div>
                <div>
                  <label>
                    Admin:
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
                {/*  <div>
                  <label>
                    Promotion:
                    <input type="checkbox" checked={isAskingPromotion} onChange={(e) => setIsAskingPromotion(e.target.checked)} />
                  </label>
                </div> */}
                <button
                  type="submit"
                  className="btn btn-primary w-50 mt-4 rounded-pill"
                >
                  Register
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
