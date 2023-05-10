import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import bcrypt from 'bcryptjs';
import AuthContext from '../contexts/AuthContext';
import {


  CardHeader,
  CardBody,
  FormGroup,

  Input,
  Container,
  Row,
  Col
} from "reactstrap";
function UserProfile() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (window.localStorage.token) {
          const decode = jwt_decode(window.localStorage.token);
          const response = await fetch(`http://localhost:5000/api/users/${decode.data}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
          setFormData({
            id: data._id,
            username: data.username,
            email: data.email,
            firstname : data.firstname,
            lastname: data.lastname,
            password: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);
  const usr = useContext(AuthContext).user;
  useEffect(() => {
    if (usr) setUser(usr)
  }, [usr])

 

   const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      window.alert('Passwords do not match');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the saltRounds
      const response = await axios.put(`http://localhost:5000/api/users/`, {
        ...formData,
        password: hashedPassword // set the hashed password to the formData object
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
    <div style={{ textAlign: "center" }}>
    <img style={{ maxWidth: "100%", height: "auto" }} variant="top" src={process.env.PUBLIC_URL + '/image/profile9.png'} alt="profile icon" />

    </div>
    <div className="container shadow my-5">
      <div style={{ textAlign: "center" }}>
        <h1>User Profile</h1>
        <p >UserName: {user.username}</p>
        

      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>

          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username*"
            required
            value={formData.username} // Mettre à jour la valeur avec celle stockée dans formData
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
          Firstname
          </label>

          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            placeholder="firstname*"
            required
            value={formData.firstname} // Mettre à jour la valeur avec celle stockée dans formData
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
          Lastname
          </label>

          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            placeholder="lastname*"
            required
            value={formData.lastname} // Mettre à jour la valeur avec celle stockée dans formData
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email*"
            required
            value={formData.email} // Mettre à jour la valeur avec celle stockée dans formData
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="Password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password*"
            required
            value={formData.password} onChange={handleInputChange}
          />
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
            required
            value={formData.confirmPassword} onChange={handleInputChange}
          />
        </div>
<center>
        <Button variant="primary" type="submit">
          Modify
        </Button>
        </center>
        <br></br>
      </form>
    </div>
  </div>
  );
}

export default UserProfile;
