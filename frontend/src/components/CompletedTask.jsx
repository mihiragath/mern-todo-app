import moment from "moment";
import { useTheme } from "../context/ThemeContext";

function CompletedTask({ task }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-slate-300 text-slate-900"
      }`}
    >
      <div
        className={`task-info text-sm w-10/12 ${isDarkMode ? "text-gray-200" : "text-slate-900"}`}
      >
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div
          className={`italic opacity-60 ${isDarkMode ? "text-gray-400" : ""}`}
        >
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
