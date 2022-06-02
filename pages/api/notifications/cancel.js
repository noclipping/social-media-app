import User from "../../models/userModel";
export default async function handler(req, res) {
  const body = req.body;

  await User.findOneAndUpdate(
    { _id: body.recipient },
    { $pull: { notifications: { type: "friendRequest", userId: body.userId } } }
  ).then((resp) => {
    res.status(200).send(resp);
  });
}
