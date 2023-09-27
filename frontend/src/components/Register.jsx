import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      // Fetch the API endpoint for registration
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response
      const data = await response.json();

      // Check if the registration was successful
      if (data.message === "User registered successfully") {
        console.log("User registered successfully");
        setMessage("User registered successfully");
        setMessageType("success");
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/posts"); // navigate to Posts page
      } else {
        console.log("Registration failed");
        setMessage(data.message || "Registration failed");
        setMessageType("error");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <div className="p-4 bg-neutral-800 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-neutral-50">
          Register
        </h1>
        {message && (
          <div
            className={`mt-4 text-center text-${
              messageType === "success" ? "lime" : "red"
            }-500`}
          >
            {message}
          </div>
        )}
        <form className="space-y-3" onSubmit={handleRegisterSubmit}>
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
          <div>
            <label
              className="block text-sm font-medium text-neutral-300"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 p-2 w-full rounded-md border border-neutral-700 text-neutral-900"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-lime-500 text-neutral-900 rounded-md hover:bg-lime-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
