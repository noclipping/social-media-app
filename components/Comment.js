import Link from "next/link";
import React from "react";
import styles from "../styles/Comment.module.css";

export default function Comment({ comment }) {
  let date = new Date(comment.createdAt);
  date.toDateString(); // 'Wed May 25 2022'
  date.toGMTString(); // 'Wed, 25 May 2022 07:10:17 GMT'
  date.getMonth(); // 4
  return (
    <div className={styles.container}>
      <Link href={`users/${comment.uid}`}>
        <h1 className={styles.username}>{comment.username}</h1>
      </Link>
      <p className={styles.content}>{comment.content}</p>

      <h2>{new Date(comment.createdAt).toDateString()}</h2>
    </div>
  );
}
