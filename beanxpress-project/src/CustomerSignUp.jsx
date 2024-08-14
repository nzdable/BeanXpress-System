import React, { useState } from 'react';
import axios from 'axios'; 
import './styles/CustomerSignUp.css'; 
import { Link } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5173/register', { firstName, lastName, email, username, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Fixed typo here
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="footer">
        <p>
          Already have an account? <Link to="/customerLogIn">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
