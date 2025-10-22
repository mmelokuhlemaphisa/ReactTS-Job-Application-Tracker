import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "../components/ui";

interface User {
  id?: number; // ✅ needed for jobs relation
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
        // ✅ Check if username already exists (not password)
        const res = await fetch(
          `http://localhost:3000/users?username=${newUser.username}`
        );
        const existingUsers = await res.json();

        if (existingUsers.length > 0) {
          alert(
            "This username is already taken. Please choose a different one."
          );
          return;
        }

        // ✅ Save new user to /users collection
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const data = await response.json();

          // ✅ Save the new user in localStorage
          localStorage.setItem("currentUser", JSON.stringify(data));

          alert(`User ${data.username} registered successfully!`);
          navigate("/home"); // go directly to home after registration
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
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br /> <br />
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <Button className="button" type="submit">
              Sign up
            </Button>
            <br />
            <br />
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link-logout">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
