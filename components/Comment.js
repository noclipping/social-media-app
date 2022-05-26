import Link from "next/link";
import React from "react";
import styles from "../styles/Comment.module.css";
export default function Comment({ comment }) {
  return (
    <div className={styles.container}>
      <Link href={`users/${comment.uid}`}>
        <h1 className={styles.username}>{comment.username}</h1>
      </Link>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
