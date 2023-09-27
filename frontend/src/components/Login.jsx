import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        console.log("User logged in successfully");
      } else if (data.message === "Invalid password") {
        setErrorMessage("Invalid password");
      } else {
        setErrorMessage(data.message || "An unknown error occurred"); // Set the error message from the backend if it exists, else set to 'An unknown error occurred'
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <div className="p-4 bg-neutral-800 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-neutral-50">Login</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form className="space-y-3" onSubmit={handleLoginSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-neutral-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 w-full rounded-md border border-neutral-700 text-neutral-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-neutral-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 p-2 w-full rounded-md border border-neutral-700 text-neutral-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-lime-500 text-neutral-900 rounded-md hover:bg-lime-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
