import Notification from "../../models/notificationModel";
import User from "../../models/userModel";
export default async function handler(req, res) {
  const body = req.body;
  const notification = new Notification({
    type: body.type,
    message: body.message,
    username: body.username,
    userId: body.userId,
    recipient: body.recipient,
  });
  await User.findOneAndUpdate(
    { _id: body.recipient },
    { $push: { notifications: notification } }
  ).then((resp) => {
    res.status(200).send(resp);
  });
}
