import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginOrRegister from "./components/LoginOrRegister";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="container mx-auto text-neutral-50">
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={isAuthenticated ? <Posts /> : <LoginOrRegister />}
          />
        </Routes>
      </div>
    </Router>
  );
}
