import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="container mx-auto text-neutral-50">
        <Routes>
          <Route path="/posts" element={<PostsComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <PostsComponent />
              ) : (
                <LoginOrRegisterComponent />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
