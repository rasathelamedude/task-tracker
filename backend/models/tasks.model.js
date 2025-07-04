import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name must be provided!"],
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In-progress", "Completed"],
    default: "Pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

export default Task;
