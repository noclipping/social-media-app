import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.stack.imgur.com/34AD2.jpg",
    },
    posts: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    notifications: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
let Dataset = mongoose.models.users || mongoose.model("users", userSchema);
export default Dataset;
