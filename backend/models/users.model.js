import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username must be provided!"],
        strip: true
    },
    email: {
        type: String,
        required: [true, "An email must be provided!"]
    },
    password: {
        type: String,
        required: [true, "A password must be provided!"]
    }
});

const User = mongoose.model("User", userSchema);

export default User;