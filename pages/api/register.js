import bcrypt from "bcrypt";
import Users from "../models/userModel";
import { userSchema } from "../schemas/RegisterValidation";
export default async function handler(req, res) {
  const body = req.body;
  const userExists = await Users.findOne({ username: body.username });
  if (userExists) {
    return res.status(404).json({ message: "Already registered" });
  }
  try {
    await userSchema.validate(body);
  } catch (err) {
    return res.status(400).json({ message: err.errors });
  }

  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(body.password, salt);
  const user = new Users({
    username: body.username,
    email: body.email,
    password: hashpass,
  });
  await user.save();
  res.status(400).json({ message: "Registered successfully" });
}
