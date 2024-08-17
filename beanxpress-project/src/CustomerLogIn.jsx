import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { firstName, lastName, email, username } = state || {};

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform actual login logic here
    // Simulate successful login and navigate to CustomerHome
    navigate('/customerHome', { state: { firstName, lastName, email, username } });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          value={loginUsername} 
          onChange={(e) => setLoginUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          value={loginPassword} 
          onChange={(e) => setLoginPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/customerSignUp">Sign Up</Link></p>
    </div>
  );
}

export default Login;
