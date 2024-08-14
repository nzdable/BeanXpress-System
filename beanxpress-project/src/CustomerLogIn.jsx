import React from 'react';
import './styles/CustomerLogIn.css'; // Assuming you want to separate styles

const Login = () => {
  return (
    <div className="container">
      <h1>Login</h1>

      <form autoComplete="off" action="/login" method="post">
        <input name="username" type="text" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>

        <div className="footer">
          <p>Don't have an account? <a href="/customerSignUp">Create a new account</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
