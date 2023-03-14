import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/users/getCurrent')
      .then((res) => {
        console.log('res.data');
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const login = (usr) => {
    setUser(usr);
  };

  const logout = () => {
    console.log('logged OUTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
    axios
      .get('/auth/logout')
      .then(setUser(null))
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
