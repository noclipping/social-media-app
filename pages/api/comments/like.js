import Comments from "../../../models/commentModel";
import Post from "../../../models/postModel";
import mongoose from "mongoose";
export default async function handler(req, res) {
  const commentId = req.body.commentId; // this is being casted as a string, so we use mongoose
  // types obj id to convert commentID to a mongoObject for our comparison
  const postId = req.body.postId;
  const userId = req.body.userId;
  const liked = req.body.liked;
  /*
  Add a check here to see if the user liked it already, gonna need to be sent the
  user's ID making the request, and then see if his name is contained within
  the comment's likedBy array, if so, decerement the likes, otherwise, increase.
  */
  if (!liked) {
    await Comments.findByIdAndUpdate(commentId, {
      $inc: { likes: 1 },
    }).then((data) => {});

    await Post.findOneAndUpdate(
      { _id: postId, "comments._id": mongoose.Types.ObjectId(commentId) },
      {
        $inc: { "comments.$.likes": 1 },
        $push: { "comments.$.likedBy": userId },
      }
    ).then((data) => {
      res.status(200).json(data);
    });
  } else {
    await Comments.findByIdAndUpdate(commentId, {
      $inc: { likes: -1 },
    }).then((data) => {});

    await Post.findOneAndUpdate(
      { _id: postId, "comments._id": mongoose.Types.ObjectId(commentId) },
      {
        $inc: { "comments.$.likes": -1 },
        $pull: { "comments.$.likedBy": userId },
      }
    ).then((data) => {
      res.status(200).json(data);
    });
  }
}
