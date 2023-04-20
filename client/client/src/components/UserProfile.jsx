import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import bcrypt from 'bcryptjs';

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
    email: '',
    password:'',
  });

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
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleShowModal = () => {
    setFormData({
      id: user._id,
      username: user.username,
      email: user.email,
      password:user.password
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
   
     <Card>
  <div style={{textAlign: "center"}}>
    <img style={{width: "1600px", height: "400px"}}  variant="top" src={process.env.PUBLIC_URL + '/image/profile9.png'} alt="profile icon" />
  </div>
  <Card.Body>
  <div className="container shadow my-5">
    <Card.Text style={{textAlign: "center"}}>
      <h1>User Profile</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>

      <Button variant="primary" onClick={handleShowModal}>Modify User</Button>
    </Card.Text>
    </div>
  </Card.Body>
</Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modify User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"     id="password" placeholder="Enter password" name="password"  required
     
               value={formData.password} onChange={handleInputChange} />
                  {passwordStrength === 'fort'  && (
                    <p style={{ color: 'green' }}>Strong password</p>
                  )}
                  {passwordStrength === 'moyen' && (
                    <p style={{ color: 'orange' }}>Medium password</p>
                  )}
                  {passwordStrength === 'faible' && (
                    <p style={{ color: 'red' }}>Weak password</p>
                  )}
              </Form.Group>

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











            <Button variant="primary" type="submit">
              Modify
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;
