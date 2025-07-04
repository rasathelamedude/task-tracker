import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decode = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decode.userId);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
