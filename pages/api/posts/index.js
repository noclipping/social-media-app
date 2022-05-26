import Posts from "../../models/postModel";
export default async function handler(req, res) {
  const posts = await Posts.find().sort({ createdAt: -1 });
  res.status(200).json({ posts });
}
