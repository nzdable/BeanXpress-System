import React, { useState } from 'react';
import axios from 'axios'; 
import './styles/CustomerSignUp.css'; 
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5173/register', { firstName, lastName, email, username, password })
      .then(result => {
        console.log(result);
        navigate('/customerLogIn', { state: { firstName, lastName, email, username, password } });

      })
      .catch(err => {
        console.error('There was an error Signing up:', err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>

    <p>Already have an account? <Link to="/customerLogIn">Log In</Link></p>

    </div>

  );


}

export default Signup;
