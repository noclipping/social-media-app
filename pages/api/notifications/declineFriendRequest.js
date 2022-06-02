import mongoose from "mongoose";
import User from "../../models/userModel";
export default async function handler(req, res) {
  const body = req.body;

  await User.findOneAndUpdate(
    { _id: body.currentUser },
    {
      $pull: {
        notifications: { _id: mongoose.Types.ObjectId(body.notificationId) },
      },
    }
  ).then((resp) => {
    console.log(resp);
    console.log(body.notificationId);
    res.status(200).send(resp);
  });
}
