import Comment from "../../models/commentModel";
import Post from "../../models/postModel";
export default async function handler(req, res) {
  const body = req.body;
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
        }
      );
    });
  await res.status(400).json({ message: "Comment created" });
}
