import React from "react";

const logout = () => {
  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout')
      .then(response => {
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
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default logout;