import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/users/getCurrent')
      .then((res) => {
        if (res.data) setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(`user = `);
    console.log(user);
  }, [user]);

  const login = (usr) => {
    setUser(usr);
  };

  const logout = () => {
    console.log('logged out');
    axios
      .get('/auth/logout')
      .then(setUser(null))
      .catch((err) => console.log(err));
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
