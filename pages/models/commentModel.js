import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.comments || mongoose.model("comments", commentSchema);
export default Dataset;
