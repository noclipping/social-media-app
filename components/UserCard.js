import Link from "next/link";
import React from "react";
import styles from "../styles/UserCard.module.css";
export default function UserCard({ user }) {
  return (
    <div className={styles.parent_container}>
      <img src="https://i.stack.imgur.com/34AD2.jpg" className={styles.img} />
      <Link href={`/users/${user._id}`}>
        <div style={{ cursor: "pointer" }}>{user.username}</div>
      </Link>

      <button style={{ justifySelf: "end" }}>Add Friend</button>
    </div>
  );
}
