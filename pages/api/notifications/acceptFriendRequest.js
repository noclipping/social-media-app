import User from "../../models/userModel";
import mongoose from "mongoose";
export default async function handler(req, res) {
  const body = req.body;
  await User.findOneAndUpdate(
    { _id: body.currentUser },
    { $push: { friends: body.senderId } }
  ).then((resp) => {});
  await User.findOneAndUpdate(
    { _id: body.senderId },
    { $push: { friends: body.currentUser } }
  );
  // mongoose.Types.ObjectId(commentId)a
  await User.findOneAndUpdate(
    { _id: body.currentUser },
    { $pull: { notifications: { _id: body.notificationid } } }
  ).then((resp) => {
    res.status(200).send(resp);
  });
}
