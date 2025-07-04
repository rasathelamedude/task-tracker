import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import userRouter from "./routes/users.routes.js";
import { errorHandling } from "./middlewares/error.middleware.js";
import cors from "cors";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

const app = express();

// built in || third-party mids
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// routes;
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// global middlewares;
app.use(errorHandling);
app.use(arcjetMiddleware);

app.listen(PORT, async () => {
  await connectToDatabase();
});
