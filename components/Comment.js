import Link from "next/link";
import React from "react";
import styles from "../styles/Comment.module.css";
// import formatDistance from 'date-fns/formatDistance'

// function TestComponent() {
//    const dateStr = "2021-10-26T12:24:33.433+00:00";
//    const str = formatDistance(
//        new Date(dateStr),
//        new Date()
//    );
//    return <h1>{str}</h1>
// }

export default function Comment({ comment }) {
  return (
    <div className={styles.container}>
      <Link href={`users/${comment.uid}`}>
        <h1 className={styles.username}>{comment.username}</h1>
      </Link>
      <p className={styles.content}>{comment.content}</p>

      <h2>{comment.createdAt}</h2>
    </div>
  );
}
