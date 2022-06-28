import Post from "../../../models/postModel";
import mongoose from "mongoose";
export default async function handler(req, res) {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const liked = req.body.liked;
  if (!liked) {
    await Post.findByIdAndUpdate(postId, {
      $inc: { likes: 1 },
    }).then((data) => {});

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { likedBy: userId } }
    ).then((data) => {
      res.status(200).json(data);
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $inc: { likes: -1 },
    }).then((data) => {});

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { likedBy: userId } }
    ).then((data) => {
      res.status(200).json(data);
    });
  }
}
