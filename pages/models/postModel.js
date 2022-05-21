import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);
let Dataset = mongoose.models.users || mongoose.model("posts", postSchema);
export default Dataset;
