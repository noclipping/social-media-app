import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";

export default function Comment({ comment, postId }) {
  const { data: session } = useSession();
  const [commentLiked, setCommentLiked] = useState(false);
  let date = new Date(comment.createdAt);
  let currentTime = new Date();
  const timeElapsed = currentTime.getTime() - date;
  const seconds = Math.round(timeElapsed / 1000);
  const minutes = Math.round(timeElapsed / 60000);
  const hours = Math.round(timeElapsed / 3600000);
  const days = Math.floor(timeElapsed / (24 * 3600000));
  const years = Math.floor(timeElapsed / (24 * 3600000 * 365));
  useEffect(() => {
    if (comment.likedBy.includes(session?.user._id)) {
      setCommentLiked(true);
    }
  }, [session]);
  function getTimeElapsed() {
    return timeElapsed < 60000
      ? seconds + (seconds < 2 ? " second" : " seconds")
      : timeElapsed < 3600000
      ? minutes + (minutes < 2 ? " minute" : " minutes")
      : timeElapsed < 24 * 3600000
      ? hours + (hours < 2 ? " hour" : " hours")
      : timeElapsed < 24 * 3600000 * 365
      ? days + (days < 2 ? " day" : " days")
      : years + (years < 2 ? " year" : " years");
  }
  const handleLike = (e) => {
    if (!session?.user) {
      return;
    }
    if (commentLiked) {
      setCommentLiked(false);
      comment.likes -= 1;
    } else {
      setCommentLiked(true);

      comment.likes += 1;
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data), "yo";
      });
  };
  return (
    <div className={styles.container}>
      <Link href={`users/${comment.uid}`}>
        <div className={styles.username}>
          <div>{comment.username}</div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleLike(e);
            }}
          >
            {!commentLiked ? "❤" : "❤️"} {comment.likes}
          </div>
          <div className={styles.timeElapsed}>{getTimeElapsed()} ago</div>
        </div>
      </Link>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
