import React from 'react'
import { Link } from 'react-router';

export default function Login() {
  return (
    <div className="login-section">
      <div className="card">
        <form action="" className="form">
          <h1>Login</h1>
          <label id='usename' style={{ textAlign: "start" }} htmlFor="username">
            Username:
          </label>
          <br />
          <input type="text" placeholder="Enter username" />
          <br />
          <br />
          <label id='password' htmlFor="password">Password:</label>
          <br />
          <input type="text" placeholder="Enter password" />
          <br /><br />
           <button className="button" type="submit">
          <Link className="link-a" to="/home">
            Login
          </Link>
          </button>
        </form>
      </div>

      <div className="text-section">
        <h1>Register</h1>
        <p>Don't have an account? Please Register </p>
        <br />
        <button className="loginBtn" type="submit">
          <Link className="link-login" to="/register">
           Register here
          </Link>
        </button>
      </div>
    </div>
  );
}
