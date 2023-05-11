import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import axios from '../lib/axios';

function Verify() {
  const { token } = useParams();
  const [username, setUsername] = useState(null);
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .post('/users/verifyEmailAfterSignUp', {
        token,
      })
      .then((res) => {
        if (res.data) {
          login(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  return (
    <>
      <br />
      <br />
      <br />
      {username ? (
        <h1>
          Welcome <b>{username}</b>, your email has been confirmed with success
        </h1>
      ) : (
        <h1>Invalid Token !</h1>
      )}
      <br />
      <br />
      <br />
    </>
  );
}

export default Verify;
