import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      window.alert('Problem ');
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/reset", { password, token });
      console.log(res.status);
      setSuccess(true);
      window.alert('password changed');
      // rediriger vers la page de connexion après avoir changé le mot de passe
      navigate('/login');
    } catch (error) {
      console.error(error);
      window.alert('Problem ');
    }
    
  };

  const handleChangePassword = async (e) => {
    const newPassword = e.target.value;
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
    <div className="container shadow my-5">
      <center>
        <div className="col-md-6 p-5">
          <h1 className="display-6 fw-bolder mb-5 text-gris">Reset Password</h1>
        </div>
        <img src="./image/rest.png" className="img-thumbnail" alt=""></img>
      </center>
      <form onSubmit={handleReset}>
        <div className=" col-md-6 p-5 mb-3 mx-auto">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
            {passwordStrength === 'fort' && <p style={{ color: 'green' }} >Strong password</p>}
            {passwordStrength === 'moyen' && <p style={{ color: 'orange' }} >Medium password</p>}
            {passwordStrength === 'faible' && <p style={{ color: 'red' }}>Weak password</p>}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-100 mt-4 rounded-pill"
          >
            Reset
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;