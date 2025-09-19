import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Error from "./components/pages/404";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import JobPage from "./components/pages/JobPage";

function App() {
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          currentUser ? (
            <Home currentUser={currentUser} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/jobpage/:id" element={<JobPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
