import Posts from "../../../models/postModel";
import connectDB from "../auth/lib/connectDB";
export default async function handler(req, res) {
  connectDB();
  const posts = await Posts.find().sort({ createdAt: -1 });
  res.status(200).json({ posts });
}
