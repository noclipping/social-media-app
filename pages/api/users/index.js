import Users from "../../models/userModel";
export default async function handler(req, res) {
  const users = await Users.findOne({}, { password: 0 });
  res.status(200).json({ users });
}
