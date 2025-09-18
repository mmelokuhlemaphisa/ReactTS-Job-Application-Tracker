import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!newUser) return;

    const saveUser = async () => {
      try {
        // Check if password already exists
        const res = await fetch(
          `http://localhost:3000/user?password=${newUser.password}`
        );
        const existingUsers = await res.json();

        if (existingUsers.length > 0) {
          alert(
            "This password is already used. Please choose a different password."
          );
          return;
        }

        // Save user if password is unique
        const response = await fetch("http://localhost:3000/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User ID:", data.id);
          alert(`User ${data.username} registered successfully!`);
          navigate("/login");
        } else {
          alert("Failed to register user");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    };

    saveUser();
  }, [newUser, navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    setNewUser({ username, password });
  };

  return (
    <div>
      <div className="register-section">
        <div className="card">
          <form className="form" onSubmit={handleRegister}>
            <h1>Register</h1>
            <br /> <br />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br /> <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <button className="button" type="submit">
              Sign up
            </button>
            <br /><br />
            <p>
              Already have an account? <Link to="/login" className="link-logout">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
