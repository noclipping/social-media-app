import { useSession } from "next-auth/react";
import React from "react";
import server from "../config/index";
import styles from "../styles/Post.module.css";
import Link from "next/link";
export default function Post({ post }) {
  const { data: session } = useSession();
  console.log(post);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://i.stack.imgur.com/34AD2.jpg"
          style={{
            display: "inline-block",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            margin: "5px",
          }}
        />
        <div style={{ display: "inline-block" }}>
          <Link href={`/users/${post.uid}`}>
            <p style={{ cursor: "pointer" }}>{post.username}</p>
          </Link>
        </div>
      </div>
      <p className={styles.content}>{post.content}</p>
      <div>Comments</div>
      <br />
      <div>
        <form>
          <div>comment as {session?.user.username} </div>
          <br />
          <input placeholder="comment" style={{ width: "80%" }} />
          <button style={{ width: "20%" }}>Submit</button>
        </form>
      </div>
    </div>
  );
}
