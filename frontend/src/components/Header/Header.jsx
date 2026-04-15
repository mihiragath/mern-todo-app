import React from "react";
import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TokenContext from "../../context/TokenContext.js";
import { useTheme } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./header.css";
function Header() {
  const token = localStorage.getItem("authToken");
  const { user } = useContext(TokenContext);
  const { isDarkMode, toggleTheme } = useTheme();
  console.log("user", user);
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav
        className={`header ${isDarkMode ? "bg-gray-800 text-white" : "bg-slate-200"} flex justify-between items-center transition-colors duration-300`}
      >
        <div className="logo w-1/4 text-center">
          <NavLink to="/" className={isDarkMode ? "text-white" : "text-black"}>
            Todo App
          </NavLink>
        </div>
        <div className="flex justify-between items-center">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`mr-4 p-2 rounded-full transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </button>

          {token ? (
            <div className="flex items-center justify-center">
              <p
                className={`mr-5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                welcome,{" "}
                <span
                  className={`text-xl ${isDarkMode ? "text-blue-400" : "text-blue-800"} capitalize`}
                >
                  {user.name}
                </span>
              </p>
              <button
                onClick={logout}
                className={`logout mr-4 ${isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"} text-white px-4 py-2 rounded transition-colors duration-300`}
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex justify-end gap-3 w-3/4 pr-6">
              <li>
                <NavLink
                  to="/login"
                  className={`px-4 py-2 rounded transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={`px-4 py-2 rounded transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;
