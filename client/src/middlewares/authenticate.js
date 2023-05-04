import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

function Authenticate({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : Navigate('/login');
}

export default Authenticate;
