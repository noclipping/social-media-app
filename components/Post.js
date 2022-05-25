import { useSession } from "next-auth/react";
import React from "react";
import server from "../config/index";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import { useState } from "react";
export default function Post({ post }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/comments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: session.user._id,
        postId: post._id,
        username: session.user.username,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent("");
      });
  };

  return (
    <div className={styles.container}>
      <Link href={`/users/${post.uid}`}>
        <div style={{ cursor: "pointer" }} className={styles.header}>
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
            <p style={{ cursor: "pointer" }}>{post.username}</p>
          </div>
        </div>
      </Link>
      <p className={styles.content}>{post.content}</p>
      <div>Comments</div>
      <br />
      <div>
        <form>
          <div>comment as {session?.user.username} </div>
          <br />
          <input
            placeholder="comment"
            style={{ width: "80%" }}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            style={{ width: "20%" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
        <div>
          {post.comments.map((comment) => (
            <p key={comment._id}>{comment.content}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
