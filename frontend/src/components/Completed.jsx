import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";
function Completed() {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div>
      {completedTasks.length !== 0 ? (
        completedTasks.map((task) => (
          <CompletedTask key={task._id} task={task} />
        ))
      ) : (
        <h1>No Completed Tasks</h1>
      )}
    </div>
  );
}

export default Completed;
