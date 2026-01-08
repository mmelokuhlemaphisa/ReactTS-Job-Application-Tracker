import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components/ui";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      //  Make sure your db.json has "users" not "user"
      const response = await fetch(
        `https://job-tracker-api-jze2.onrender.com/jobs/users?username=${username}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];

        // Save only this user object
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert(`Welcome ${user.username}!`);
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
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button className="button" type="submit">
            Login
          </Button>
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
