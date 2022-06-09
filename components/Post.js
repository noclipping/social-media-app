import { useSession } from "next-auth/react";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import Comment from "./Comment";
import { React, useState, useEffect } from "react";
export default function Post({ post }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const handleLike = (e) => {
    e.preventDefault();
    if (!session) {
      return;
    }
    if (!postLiked) {
      setPostLiked(true);
      post.likes += 1;
    } else {
      setPostLiked(false);
      post.likes -= 1;
    }
    fetch(`/api/posts/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
        userId: session.user._id,
        liked: postLiked,
      }),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session?.user) {
      setErrMessage("you must be signed in to comment!");
      return;
    }
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
        if (data.error) {
          console.log("error!");
          setErrMessage(data.message);
          return;
        }
        setContent("");
        setErrMessage("");
        console.log(data);
        document.getElementById("commentContent").value = "";
        setComments((prevState) => [...prevState, data.comment]);
      });
  };
  useEffect(() => {
    if (post.likedBy?.includes(session?.user._id)) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
    setComments(post.comments);
  }, [session]);
  const commentComp = comments?.map((comment) => (
    <Comment key={comment._id} comment={comment} postId={post._id} />
  ));
  return (
    <div
      className={`${styles.container} ${styles.animated} ${styles.fadeInDown}`}
    >
      <Link href={`/users/${post.uid}`}>
        <div style={{ cursor: "pointer" }} className={styles.header}>
          {/* Post Likes */}
          <div onClick={(e) => handleLike(e)}>
            {postLiked ? (
              <span className={styles.fade_in}>❤️ </span>
            ) : (
              <span className={styles.white_heart}>❤ </span>
            )}
          </div>
          <div
            style={{
              padding: "0px 5px",

              display: "inline-block",
            }}
          >
            {post.likes}
          </div>
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
            <p style={{ display: "inline-block", cursor: "pointer" }}>
              {post.username}
            </p>
          </div>
        </div>
      </Link>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.comments}>Comments</div>
      <br />
      <div>
        <form>
          <div>
            comment as {session?.user ? session.user.username : "guest"}{" "}
          </div>
          <br />
          <p style={{ color: "red", fontSize: "14px" }}>{errMessage}</p>
          <br />
          <input
            id="commentContent"
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
          {!loadMore && commentComp?.length > 2
            ? commentComp
                ?.splice(commentComp.length - 3, commentComp.length)
                .reverse()
            : commentComp?.reverse()}
        </div>
        {comments?.length > 3 && !loadMore ? (
          <div>
            {" "}
            <br />
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setLoadMore(true);
              }}
            >
              Load more
            </div>
          </div>
        ) : comments?.length > 3 ? (
          <div>
            {" "}
            <br />
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setLoadMore(false);
                console.log(comments);
              }}
            >
              Show less
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
