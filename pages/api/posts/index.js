import Posts from "../../models/postModel";
export default async function handler(req, res) {
  const posts = await Posts.find();
  res.status(200).json({ posts });
}
