import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "guest",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: "https://i.stack.imgur.com/34AD2.jpg",
    },
  },
  { timestamps: true }
);
let Dataset = mongoose.models.users || mongoose.model("users", userSchema);
export default Dataset;
