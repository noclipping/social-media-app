import User from "../../../models/userModel";
import mongoose from "mongoose";
export default async function handler(req, res) {
  const body = req.body;
  await User.findOneAndUpdate(
    { _id: body.currentUser },
    { $pull: { friends: body.profileId } }
  ).then((resp) => {});
  await User.findOneAndUpdate(
    { _id: body.profileId },
    { $pull: { friends: body.currentUser } }
  ).then((resp) => {
    res.status(200).json(resp);
  });
  // mongoose.Types.ObjectId(commentId)a
}
