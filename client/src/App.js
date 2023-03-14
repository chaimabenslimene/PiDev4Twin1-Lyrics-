import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Forgetpassword from './components/Forgetpassword';
import ResetPassword from './components/ResetPassword';
//import {Route , Switch} from 'react-router-dom';
//import { Routes ,Route } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgetPassword" element={<Forgetpassword />} />
          <Route
            exact
            path="/resetPassword/:token"
            element={<ResetPassword />}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
