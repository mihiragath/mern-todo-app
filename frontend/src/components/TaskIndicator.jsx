import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function TaskIndicator() {
  const { isDarkMode } = useTheme();

  return (
    <div className=" flex-grow">
      <nav>
        <ul
          className={`flex gap-3 justify-between p-3 rounded-lg shadow-2xl transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700" : "bg-slate-400"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded transition-colors duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-700 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-700 hover:bg-slate-300"
                }`
              }
            >
              All Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/active"
              className={({ isActive }) =>
                `px-3 py-1 rounded transition-colors duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-700 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-700 hover:bg-slate-300"
                }`
              }
            >
              Active
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `px-3 py-1 rounded transition-colors duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-700 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-600"
                      : "text-gray-700 hover:bg-slate-300"
                }`
              }
            >
              Completed
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TaskIndicator;
