import { useSession } from "next-auth/react";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import Comment from "./Comment";
import { React, useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import getTimeElapsed from "./functions/getTimeElapsed";
export default function Post({ post, deletePost }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const modalEl = useRef(null);
  const timeElapsed = new Date().getTime() - new Date(post.createdAt);

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
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("deleted", post._id);
    deletePost(post._id, post.imgURL);
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
        setContent("");
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
      <div ref={modalEl} id="myModal" className={styles.modal}>
        <div className={styles.modalContent}>
          <span
            onClick={() => {
              modalEl.current.style.display = "none";
            }}
            className={styles.close}
          >
            &times;
          </span>
          <p
            style={{
              display: "block",
              paddingTop: "9px",
              paddingBottom: "20px",
            }}
          >
            Are you sure you want to delete this post?
          </p>
          <button
            style={{
              backgroundColor: "#ba1e1e",
              padding: "8px",
              borderRadius: "10px",
              cursor: "pointer",
              color: "white",
              marginRight: "10px",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>{" "}
          <button
            style={{
              backgroundColor: "grey",
              padding: "8px",
              borderRadius: "10px",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => {
              modalEl.current.style.display = "none";
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className={styles.header}>
        {/* Post Likes */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={(e) => handleLike(e)}
            style={{ display: "inline-block" }}
          >
            {postLiked ? (
              <span className={styles.fade_in}>❤️ </span>
            ) : (
              <span className={styles.white_heart}>🤍 </span>
            )}

            <div
              style={{
                paddingRight: "10px",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              {post.likes}
            </div>
          </div>
          {/* <img
            src="https://i.stack.imgur.com/34AD2.jpg"
            style={{
              display: "inline-block",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              margin: "5px",
            }}
          /> */}
          <div style={{ display: "inline-block" }}>
            <Link href={`/users/${post.uid}`}>
              <p style={{ display: "inline-block", cursor: "pointer" }}>
                {post.username}
              </p>
            </Link>
          </div>
        </div>
        <div style={{ whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "12px" }}>
            {getTimeElapsed(timeElapsed)} ago
          </span>
          {session?.user._id == post.uid || session?.user.admin ? (
            <FaTrashAlt
              style={{
                cursor: "pointer",
                color: "red",
                marginLeft: "10px",
                marginBottom: "-3px",
              }}
              size="15px"
              onClick={() => {
                modalEl.current.style.display = "block";
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <p className={styles.content}>{post.content}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a name={`${post._id}`}></a>
        {/* FUICKING POST IMAGE URL  BELOW!!!!!*/}
        {post.imgURL ? (
          <img
            src={post.imgURL}
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "scale-down",
            }}
          />
        ) : (
          ""
        )}
      </div>

      <div className={styles.comments}>Comments</div>

      <div>
        <form
          action={`#${post._id}`}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <p style={{ color: "red", fontSize: "14px" }}>{errMessage}</p>
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                session?.user
                  ? session.user.image
                  : "https://i.stack.imgur.com/34AD2.jpg"
              }
              style={{
                display: "inline-block",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                margin: "5px",
              }}
            />
            <input
              id="commentContent"
              placeholder="Write a comment..."
              className={styles.commentInput}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
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
