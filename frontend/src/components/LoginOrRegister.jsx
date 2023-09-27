import { Link } from "react-router-dom";

export default function LoginOrRegister() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <div className="p-4 bg-neutral-800 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-neutral-50">
          Welcome to Postly
        </h1>
        <p className="text-neutral-300 mb-4">Please choose an action:</p>

        <Link to="/login">
          <button className="w-full p-2 bg-lime-500 text-neutral-900 rounded-md hover:bg-lime-600 mb-2">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="w-full p-2 bg-lime-500 text-neutral-900 rounded-md hover:bg-lime-600">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
