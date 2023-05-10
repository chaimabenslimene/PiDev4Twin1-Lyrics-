import React, { useEffect, useState } from 'react';
import AuthLayout from '../layouts/Auth';
import axios from '../lib/axios';
import { useHistory } from 'react-router-dom';

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
  console.log(user?.isAdmin);
  console.log(user?.isAdmin == true);
  
  const history = useHistory(); // Get history object

  const login = (usr) => {
    if (usr.isAdmin == false) {
      alert('access unauthorized: user is not an admin');
    } else {
      alert(`logged in as ${user.email}`);
      setUser(usr);
      history.push('/admin/index'); // redirect to admin page
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
      {user?.isAdmin == true? children : <AuthLayout />}
    </AuthContext.Provider>
  );
}

export default AuthContext;
