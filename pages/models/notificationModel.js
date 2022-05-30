import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.notifications ||
  mongoose.model("notifications", notificationSchema);
export default Dataset;
