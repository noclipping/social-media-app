import Post from "../../../models/postModel";

import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const body = req.body;
  if (!token) {
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

// if (token) {
//   // Signed in
//   console.log("JSON Web Token", JSON.stringify(token, null, 2));
//   res.json(token);
// } else {
//   // Not Signed in
//   res.status(401);
// }
// res.end();
// // end copy pasta
