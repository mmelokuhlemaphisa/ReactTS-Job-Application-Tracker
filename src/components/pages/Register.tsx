import React from 'react'
import { Link } from 'react-router'

export default function Register() {
  return (
    <div>
      <div className="register-section">
      <div className="card">
        <form action="#" className="form">
          <h1>Register</h1>
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
            Signup
          </Link>
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
