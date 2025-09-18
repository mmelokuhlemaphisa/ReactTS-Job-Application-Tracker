import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
    
      const response = await fetch(
        `http://localhost:3000/user?username=${username}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
      
         alert(`Welcome ${data[0].username}!`);
        navigate("/home"); 
      } else {
       
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="login-section">
      <div className="card">
        <form className="form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <br /> <br />
          <label style={{ textAlign: "start" }} htmlFor="username">
            Username:
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className="button" type="submit">Login</button>
<br /> <br />
 <p>
              Don't have an account?
              <Link className="link-login" to="/register">
               Register
              </Link>
             </p>
        </form>
      </div>
</div>
  );
}
