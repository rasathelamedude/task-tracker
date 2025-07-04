import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import {authorize} from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/user", authorize, getUser);

userRouter.patch("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
