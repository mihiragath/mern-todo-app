import React from "react";
import TaskIndicator from "./TaskIndicator";
import CreateTask from "./createTask/CreateTask";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="flex flex-col md:flex-row md:justify-between">
        <CreateTask />
        <div className="task-container w-auto mx-5 md:w-1/3 mt-3">
          <div className="outlet">
            <Outlet />
          </div>
          <div className="indicator">
            <TaskIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
