import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/CustomerHome.css'; // Import the CSS file

const CustomerHome = () => {
  const location = useLocation();
  const customerObject = location.state?.customerObject;

  // Debugging: Verify that the customerObject is correctly received
  console.log('CustomerObject:', customerObject);

  if (!customerObject) {
    return <p>No customer data available.</p>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome, {customerObject.firstName}!</h1>
        <p>Your username is: {customerObject.username}</p>
        <p>Your email is: {customerObject.email}</p>
      </div>
      <div className="home-nav">
        <ul>
          <li><a href="/customerProfile">Go to Profile</a></li>
          {/* Add more navigation items if needed */}
        </ul>
      </div>
      <div className="home-content">
        <h2>Additional Information</h2>
        <p>Here you can find more details about your account and other related information.</p>
      </div>
    </div>
  );
};

export default CustomerHome;
