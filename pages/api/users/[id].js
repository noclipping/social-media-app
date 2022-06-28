import Users from "../../../models/userModel";
export default async function handler(req, res) {
  const user = await Users.findOne({ _id: req.query.id }, { password: 0 });
  res.status(200).json({ profile: user });
}
