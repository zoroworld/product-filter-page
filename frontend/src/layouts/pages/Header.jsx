import React, { useState } from "react";
import useMediaQuery from "../../hook/useMediaQuery.js";
import { useAuth } from "../../context/AuthContext.jsx";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user, login, logout } = useAuth();

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className="shadow-md">
      <nav className="navbar py-3 md:py-4">
        <div className="px-4 mx-auto md:flex md:items-center md:justify-between">
          {/* Logo + Toggle */}
          <div className="flex justify-between items-center">
            <a href="#" className="font-bold text-2xl text-indigo-600">
              FWR
            </a>
            {isMobile && (
              <button
                className="md:hidden border border-gray-400 px-3 py-1 rounded text-gray-700 hover:bg-gray-100 transition"
                onClick={handleToggle}
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
          </div>

          {/* Links */}

          <div
            className={`transition-all duration-600 ease-in-out overflow-hidden md:space-x-4 ${
              isMobile
                ? isOpen
                  ? "mobile-view"
                  : "max-h-0 left-[-100%] overflow-hidden "
                : "desktop-view max-h-full mt-0"
            }`}
          >
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
            >
              Home
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-gray-700 rounded hover:bg-gray-200 hover:text-gray-900 transition"
            >
              About
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-gray-700 rounded hover:bg-gray-200 hover:text-gray-900 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-gray-700 rounded hover:bg-gray-200 hover:text-gray-900 transition"
            >
              Pricing
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-gray-700 rounded hover:bg-gray-200 hover:text-gray-900 transition"
            >
              Contact
            </a>
            {login && user? (
              <a
                onClick={logout}
                className="p-2 lg:px-4 cursor-pointer md:mx-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition mt-1 md:mt-0"
              >
                Logout
              </a>
            ) : (
              ""
            )}

            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition mt-1 md:mt-0"
            >
              Signup
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
