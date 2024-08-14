import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerHome = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="container">
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Your username is: {user?.username}</p>
      <p>Your email is: {user?.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default CustomerHome;
