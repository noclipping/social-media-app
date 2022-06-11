import { useSession } from "next-auth/react";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import Comment from "./Comment";
import { React, useState, useEffect } from "react";
import getTimeElapsed from "./functions/getTimeElapsed";
export default function Post({ post }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [postLiked, setPostLiked] = useState(false);

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
              <span className={styles.white_heart}>❤ </span>
            )}

            <div
              style={{
                paddingRight: "10px",

                display: "inline-block",
              }}
            >
              {post.likes}
            </div>
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
            <Link href={`/users/${post.uid}`}>
              <p style={{ display: "inline-block", cursor: "pointer" }}>
                {post.username}
              </p>
            </Link>
          </div>
        </div>
        <div>{getTimeElapsed(timeElapsed)} ago</div>
      </div>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.comments}>Comments</div>
      <div>
        <form>
          <p style={{ color: "red", fontSize: "14px" }}>{errMessage}</p>
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <input
              id="commentContent"
              placeholder="Write a comment..."
              className={styles.commentInput}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              style={{ width: "20%", display: "none" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
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
