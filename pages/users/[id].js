import React from "react";
import { server } from "../../config/index";
import styles from "../../styles/Profile.module.css";
import Post from "../../components/Post";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import sendFriendRequest from "../functions/sendFriendRequest";
import cancelFriendRequest from "../functions/cancelFriendRequest";
import { useRouter } from "next/router";
import { FaPen } from "react-icons/fa";
import FriendCard from "../../components/FriendCard";
import ProfileImage from "../../components/profileImage";
export default function User({ profile, posts, profileId }) {
  const { data: session } = useSession();
  const [sentRequest, setSentRequest] = useState(false);
  const [recievedFrReqId, setRecievedFrReqId] = useState("");
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [editBioValue, setEditBioValue] = useState("");
  const [image, setImage] = useState(profile?.profile.image);
  const router = useRouter();

  useEffect(() => {
    setImage(profile?.profile.image);
    setBio(profile?.profile.bio);
    const rqSent = profile.profile.notifications.filter(
      (notif) => notif.userId === session?.user._id
    );
    const rqRecieved = session?.user?.notifications.filter(
      (notif) => notif.userId === profile.profile._id
    );
    if (rqRecieved?.length > 0) {
      setRecievedFrReqId(rqRecieved[0]._id);
    }
    if (rqSent.length > 0) {
      setSentRequest(true);
    }
    if (rqSent.length == 0) {
      setSentRequest(false);
    }
    // const onFriendsList = profile?.profile.friends.includes(session?.user._id);
    // const isTheUser = session?.user._id == profileId;
  }, [profile, session, session?.user?.notifications]);
  function changeImage(url) {
    setImage(url);
  }
  function bioHandler() {
    fetch(`${server}/api/edits/bio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        bio: editBioValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      });
  }

  function handleFrRequest() {
    sendFriendRequest(session.user.username, session.user._id, profileId);
    setSentRequest(true);
  }
  function handleCancelFrRequest() {
    cancelFriendRequest(session.user.username, session.user._id, profileId);
    console.log("cancel fr request");
    setSentRequest(false);
  }
  function handleRemoveFr() {
    console.log(session.user._id, "session user id");
    fetch(`${server}/api/notifications/removeFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        profileId: profile.profile._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});

    document.querySelector("#removeFriend").style.display = "none";
    console.log(session.user.friends);
    session.user.friends = session.user.friends.filter(
      (uzr) => uzr === profileId
    );
  }
  return (
    <div className={styles.container}>
      <div
        style={{
          borderBottom: "solid 1px white",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <img className={styles.profile_picture} src={image} />
        {session?.user._id === profile.profile._id ? (
          <ProfileImage changeImage={changeImage} />
        ) : (
          ""
        )}
        <h1 className={styles.username}>{profile?.profile.username}</h1>
        {!session ||
        session?.user._id == profileId ||
        profile?.profile.friends.includes(session?.user._id) ||
        sentRequest ? (
          ""
        ) : (
          <span
            className={styles.addFriend}
            onClick={() => {
              handleFrRequest();
            }}
          >
            Add Friend
          </span>
        )}
        {sentRequest ? (
          <span
            className={styles.addFriend}
            style={{ backgroundColor: "grey" }}
            onClick={() => {
              handleCancelFrRequest();
            }}
          >
            cancel friend request
          </span>
        ) : (
          ""
        )}
        {profile?.profile.friends.includes(session?.user._id) ? (
          <span
            id="removeFriend"
            className={styles.addFriend}
            style={{ backgroundColor: "grey" }}
            onClick={(e) => {
              handleRemoveFr();
            }}
          >
            remove friend
          </span>
        ) : (
          ""
        )}
        <br />
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", paddingTop: "30px" }}>
            {bio}
          </div>{" "}
          {editing ? (
            <form>
              <input
                onChange={(e) => {
                  setEditBioValue(e.target.value);
                }}
              />
              <button
                style={{ backgroundColor: "white" }}
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(false);
                  setBio(editBioValue);
                  bioHandler();
                }}
              >
                Accept
              </button>
            </form>
          ) : (
            ""
          )}
          {/*
            EDIT BIO BELOW
          */}
          {session?.user._id === profileId ? (
            <span
              onClick={() => {
                setEditing(!editing);
              }}
            >
              <FaPen style={{ cursor: "pointer" }} />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.main_content}>
        <div
          style={{
            border: "solid 1px white",
          }}
        >
          <h1 className={styles.friendsHeader}>Friends</h1>
          <div>
            {profile?.profile.friends.map((e) => {
              return <FriendCard key={e} userId={e} />;
            })}
          </div>
        </div>
        <div>
          {posts?.posts.map((post) => {
            return <Post post={post} key={post._id} profile={true} />;
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const profileData = await fetch(`${server}/api/users/${query.id}`);
  const profile = await profileData.json();
  const postsData = await fetch(`${server}/api/posts/user/${query.id}`);
  const posts = await postsData.json();
  return {
    props: {
      profile,
      posts,
      profileId: query.id,
    },
  };
}
