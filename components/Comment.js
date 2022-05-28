import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";
import getTimeElapsed from "./functions/getTimeElapsed";
import handleLike from "./functions/Comment/handleLike";
export default function Comment({ comment, postId }) {
  const { data: session } = useSession();

  const [commentLiked, setCommentLiked] = useState(false);

  const timeElapsed = new Date().getTime() - new Date(comment.createdAt);

  useEffect(() => {
    if (comment.likedBy.includes(session?.user._id)) {
      setCommentLiked(true);
    }
  }, [session]);
  function handlePress() {
    if (!session) {
      return;
    }
    if (commentLiked) {
      setCommentLiked(false);
      comment.likes -= 1;
    } else {
      setCommentLiked(true);

      comment.likes += 1;
    }
    handleLike(session, commentLiked, comment, postId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.username}>
        <div>
          <div
            onClick={(e) => {
              handlePress();
            }}
            className={styles.likes}
          >
            {!commentLiked ? "❤" : "❤️"} {comment.likes}
          </div>

          <Link href={`/users/${comment.uid}`}>{comment.username}</Link>
        </div>
        <div className={styles.timeElapsed}>
          {getTimeElapsed(timeElapsed)} ago
        </div>
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
