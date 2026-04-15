import React from "react";
import Task from "./Task/Task";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
function Active() {
  const { tasks } = useContext(TaskContext);
  const activeTasks = tasks.filter((task) => !task.completed);
  return (
    <div>
      {activeTasks.length !== 0 ? (
        activeTasks.map((task) => (
          <Task key={task._id} task={task} id={task._id} />
        ))
      ) : (
        <h1>No Active Tasks</h1>
      )}
    </div>
  );
}

export default Active;
