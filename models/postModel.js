import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    uid: {
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
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
    likedBy: {
      type: Array,
      default: [],
      required: true,
    },
    imgURL: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset = mongoose.models.posts || mongoose.model("posts", postSchema);
export default Dataset;
