import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
const addTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const user = await userModel.find({ _id: userId });
  const newTask = new taskModel({
    title,
    description,
    completed: false,
    userId,
  });
  newTask
    .save()
    .then(() => {
      return res.status(200).json({ message: "Task added successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};
const removeTask = (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  taskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const getTask = (req, res) => {
  taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const updateTask = async (req, res) => {
  const { id, title, description, completed } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await taskModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addTask, getTask, removeTask, updateTask };
