import { Link } from "react-router-dom";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          You might want to go back to the{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Home page
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
