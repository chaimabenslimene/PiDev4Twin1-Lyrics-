import React, { useEffect, useState } from 'react';
import AuthLayout from '../layouts/Auth';
import axios from '../lib/axios';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/users/getCurrent')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(`user : `);
  console.log(user);
  console.log(user?.role);
  console.log(user?.role == 1 || user?.role == 2);

  const login = (usr) => {
    if (usr.role == 0) {
      alert('access unauthorized: user is not an admin');
    } else {
      alert(`logged in as ${user.email}`);
      setUser(usr);
    }
  };

  const logout = () => {
    console.log('logged out');
    axios
      .get('/auth/logout')
      .then(setUser(null))
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {user?.role == 1 || user?.role == 2 ? children : <AuthLayout />}
    </AuthContext.Provider>
  );
}

export default AuthContext;
