import React from "react";
import moment from "moment";
import "./task.css";
import { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import { useTheme } from "../../context/ThemeContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../Axios/axios.js";
import TokenContext from "../../context/TokenContext";
function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleRemove = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/task/removeTask",
        {
          id: task._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      // Update local state
      dispatch({
        type: "REMOVE_TASK",
        id,
      });
    } catch (error) {
      console.log("Error removing task:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleMarkDone = async (e) => {
    try {
      const newCompletedStatus = !task.completed;
      await axios.put(
        "/task/updateTask",
        {
          id: task._id,
          title: task.title,
          description: task.description,
          completed: newCompletedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      // Update local state
      dispatch({
        type: "MARK_DONE",
        id,
      });
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = async () => {
    if (editTitle.trim() && editDescription.trim()) {
      try {
        await axios.put(
          "/task/updateTask",
          {
            id: task._id,
            title: editTitle.trim(),
            description: editDescription.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        // Update local state
        dispatch({
          type: "UPDATE_TASK",
          id,
          title: editTitle.trim(),
          description: editDescription.trim(),
        });
        setIsEditing(false);
      } catch (error) {
        console.log("Error updating task:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };
  return (
    <div
      className={`py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-slate-300 text-slate-900"
      }`}
    >
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </div>
      <div
        className={`task-info text-sm w-10/12 ${isDarkMode ? "text-gray-200" : "text-slate-900"}`}
      >
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={`w-full p-2 mb-2 border rounded text-lg capitalize transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
              placeholder="Task title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={`w-full p-2 border rounded transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black"
              }`}
              placeholder="Task description"
              rows="2"
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="task-actions flex gap-2">
        {isEditing ? (
          <>
            <CheckIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={handleSave}
              className="save-task-btn bg-green-600 text-white rounded-full border-2 shadow-2xl border-white p-1 hover:bg-green-700 transition-colors duration-300"
            />
            <CloseIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={handleCancel}
              className="cancel-task-btn bg-gray-600 text-white rounded-full border-2 shadow-2xl border-white p-1 hover:bg-gray-700 transition-colors duration-300"
            />
          </>
        ) : (
          <>
            <EditIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={handleEdit}
              className="edit-task-btn bg-yellow-600 text-white rounded-full border-2 shadow-2xl border-white p-1 hover:bg-yellow-700 transition-colors duration-300"
            />
            <DeleteIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              size="large"
              onClick={handleRemove}
              className="remove-task-btn bg-red-600 text-white rounded-full border-2 shadow-2xl border-white p-1 hover:bg-red-700 transition-colors duration-300"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
