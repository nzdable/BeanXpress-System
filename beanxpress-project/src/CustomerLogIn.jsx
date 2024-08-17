import React, { useState } from 'react';
import axios from 'axios'; 
import './styles/CustomerLogIn.css'; 
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://127.0.0.1:5173/login', { username, password })
      .then((response) => {
        console.log('Login successful:', response.data);
        // Ensure the response contains the necessary fields
        const { firstName, lastName, email, username } = response.data;
        navigate('/customerHome', { state: { customerObject: { firstName, lastName, email, username } } });
      })
      .catch((error) => {
        console.error('There was an error logging in:', error);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <input 
          name="username" 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Sign In</button>

        <div className="footer">
          <p>Don't have an account? <Link to="/customerSignUp">Create a new account</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
