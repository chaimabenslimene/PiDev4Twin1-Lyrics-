import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout.js';
import Register from './components/Register';
import Forgetpassword from './components/Forgetpassword';
import ResetPassword from './components/ResetPassword';
import Protectedroute from './components/ProtectedRoutes';
import { useLocation, Route, Routes, Router } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import Verify from './components/Verify';
import Voyage from './components/Voyage';
import Pannier from './components/pannier';
function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservedVoyages, setReservedVoyages] = useState([]);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch('http://localhost:5000/api/logout').then((response) => {
      if (response.ok) {
        console.log('Déconnexion réussie');
        // Rediriger vers la page de connexion
        window.location.href = '/login';
      } else {
        console.error('Erreur lors de la déconnexion');
      }
    });
  };
  return (
    <>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home onLogin={handleLogin} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="/verify/:token" element={<Verify />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/Voyage" element={<Voyage reservedVoyages={reservedVoyages} setReservedVoyages={setReservedVoyages} />} />
         
         <Route exact path="/Pannier" element={<Pannier reservedVoyages={reservedVoyages} setReservedVoyages={setReservedVoyages} />} />

          <Route exact path="/forgetPassword" element={<Forgetpassword />} />
          <Route
            exact
            path="/resetPassword/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/UserProfile" element={<UserProfile />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
