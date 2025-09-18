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
        import Home from "./components/pages/Home";
        <Route
          path="/home"
          element={
            <Home
              currentUser={JSON.parse(
                localStorage.getItem("currentUser") || "{}"
              )}
            />
          }
        />

        <Route path="/jobpage/:id" element={<JobPage />} />

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
