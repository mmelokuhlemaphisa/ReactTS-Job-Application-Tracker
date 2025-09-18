import "./App.css";
import {Routes, Route } from "react-router";
import Error from "./components/pages/404";
import Landing from "./components/pages/Landing";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import JobPage from "./components/pages/JobPage";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/jobpage" element={<JobPage />}></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
