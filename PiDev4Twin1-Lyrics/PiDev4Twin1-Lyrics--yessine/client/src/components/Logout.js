import AuthContext from '../contexts/AuthContext';

import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    return logout();
  });
  return <Navigate to={'/login'} replace={true} />;
}

export default Logout;
