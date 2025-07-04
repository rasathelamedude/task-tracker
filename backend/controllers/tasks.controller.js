import Task from "../models/tasks.model.js";
import User from "../models/users.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);

    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, description } = req.body;

    const user = await Task.create({ name, description, userId: req.user._id });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    await Task.deleteOne({ _id: taskId });

    res.status(204).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTasksForUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Task.find({ userId });

    res.status(200).json({
      success: true,
      message: "All tasks for user retrieved",
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskForUser = async (req, res) => {
  try {
    
  } catch (error) {}
};
