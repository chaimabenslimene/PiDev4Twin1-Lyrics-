
import {
  Button,
  Card,
  CardHeader,
  CardBody,
 
  Row,
  Col
} from "reactstrap";

import axios from "axios";
  import React, { useState } from 'react';

  import { NavLink } from "react-router-dom";
const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOauth, setIsOauth] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login/', { email, password });
     
      localStorage.setItem('token', res.data.token);
      setIsOauth(true);
      window.alert('bienvenue');
    } catch (error) {
      console.log(error);

    }
  };

  if (isOauth) {
    return <p> you are logged in </p>;
  }


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <div>
                  <label>
                    Email:
                    <input type="email" className="form-control" aria-describedby="email" value={email} onChange={(e) => { setEmail(e.target.value) }} style={{ width: '200px' }} />
                  </label>
                </div>
                <div>
                  <label>
                    Password:
                    <input type="password" className="form-control" aria-describedby="password" value={password} onChange={(e) => { setPassword(e.target.value) }} style={{ width: '200px' }} />
                  </label>
                </div>
                <div class="col-md-6 p-4 ps-md-0">
                  <NavLink to="/forgetPassword" className="stretched-link">Forget password ?</NavLink>

                </div>
                <button type="submit" className="btn btn-primary w-50 mt-4 rounded-pill">Login</button>
              </div>
            </form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
