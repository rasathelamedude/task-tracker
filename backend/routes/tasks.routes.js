import express from "express";
import {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
  getAllTasksForUser,
  getTaskForUser
} from "../controllers/tasks.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.get("/user", authorize, getAllTasksForUser);
taskRouter.get(":taskId/user/:userId", authorize, getTaskForUser);

taskRouter.get("/", getAllTasks);
taskRouter.get("/:taskId", getTask);

taskRouter.post("/", authorize, createTask);

taskRouter.patch("/:taskId", updateTask);

taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
