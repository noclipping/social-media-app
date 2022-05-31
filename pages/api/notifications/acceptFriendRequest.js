import User from "../../models/userModel";
export default async function handler(req, res) {
  const body = req.body;
  await User.findOneAndUpdate(
    { _id: body.currentUser },
    { $push: { friends: body.senderId } }
  ).then((resp) => {});

  await User.findOneAndUpdate(
    { _id: body.currentUser },
    { $pull: { notifications: { _id: body.notificationid } } }
  ).then((resp) => {
    res.status(200).send(resp);
  });
}
