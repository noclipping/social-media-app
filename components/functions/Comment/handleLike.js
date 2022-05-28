export default function handleLike(session, commentLiked, comment, postId) {
  if (!session?.user) {
    return;
  }
  fetch(`/api/comments/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId: comment._id,
      postId: postId,
      userId: session.user._id,
      liked: commentLiked,
    }),
  });
  // .then((res) => res.json())
  // .then((data) => {});
}
