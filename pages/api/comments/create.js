import Comment from "../../models/commentModel";
import Post from "../../models/postModel";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const body = req.body;

  if (!session) {
    res
      .status(400)
      .json({ message: "you must be signed in to comment!", error: true });
    return;
  }
  if (body.content.length < 1) {
    res.status(400).json({ message: "post not long enough!", error: true });
    return;
  }
  const comment = new Comment({
    uid: body.uid,
    postId: body.postId,
    username: body.username,
    content: body.content,
    likes: 0,
  })
    .save()
    .then((savedDoc) => {
      Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: savedDoc } },
        (err, docs) => {
          console.log("Updated doc:", docs);
          res.status(400).json({ comment: savedDoc });
        }
      );
    });
}
