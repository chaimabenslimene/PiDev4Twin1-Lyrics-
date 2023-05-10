import React, { useState, useEffect } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');
  
    useEffect(() => {
      async function fetchUserData() {
        try {
          const response = await fetch (`http://localhost:5000/api/users/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      fetchUserData();
    }, [userId]);
  
    if (!user) {
      return <div>Loading user data...</div>;
    }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      // Other user profile data here
    </div>
  );
}

export default UserProfile;
