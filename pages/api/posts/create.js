import Post from "../../models/postModel";

import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const body = req.body;
  if (!session) {
    res.status(400).json({ message: "must be signed in to post", error: true });
    return;
  }
  if (body.content < 1) {
    res
      .status(400)
      .json({ message: "insufficient post content length", error: true });
    return;
  }
  const post = new Post({
    uid: body.uid,
    username: body.username,
    content: body.content,
    imgURL: body.imgURL,
  });
  await post.save().then((savedPost) => {
    res.status(200).json(savedPost);
  });
}
