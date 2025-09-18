import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

interface User {
  username: string,
  password: string
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
        const response = await fetch("http://localhost:3000/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User saved:", data);
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

  const handleRegister = (e:any) => {
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
          <form action="#" className="form" onSubmit={handleRegister}>
            <h1>Register</h1>
            <br /> <br />
            <label
              id="usename"
              style={{ textAlign: "start" }}
              htmlFor="username"
            >
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
            <label id="password" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button className="button" type="submit">
              Signup
            </button>
            <br /> <br />
            <p>
              Already have an account?
              <Link className="link-login" to="/login">
               Sign in
              </Link>
             </p>
</form>
        </div>
      </div>
    </div>
  );
}
