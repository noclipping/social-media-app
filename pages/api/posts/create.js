// import bcrypt from "bcrypt";
// import Users from "../models/userModel";
// import { userSchema } from "../schemas/RegisterValidation";
import Post from "../../models/postModel";
export default async function handler(req, res) {
  const body = req.body;
  const post = new Post({
    uid: body.uid,
    username: body.username,
    content: body.content,
  });
  await post.save().then((savedPost) => {
    res.status(400).json(savedPost);
  });
}
