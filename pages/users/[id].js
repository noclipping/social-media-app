import React from "react";
import { server } from "../../config/index";
import styles from "../../styles/Profile.module.css";
import Post from "../../components/Post";
import { useSession } from "next-auth/react";
import { useState } from "react";
import sendFriendRequest from "../functions/sendFriendRequest";
import cancelFriendRequest from "../functions/cancelFriendRequest";
import { useEffect } from "react";
import { useRouter } from "next/router";

import FriendCard from "../../components/FriendCard";
export default function User({ profile, posts, profileId }) {
  const { data: session } = useSession();
  const [sentRequest, setSentRequest] = useState(false);
  const [recievedRequest, setRecievedRequest] = useState(false);
  const [recievedFrReqId, setRecievedFrReqId] = useState("");
  const router = useRouter();

  console.log(profile, "profile");
  console.log(profileId, "profid");
  useEffect(() => {
    if (session) {
      session.user.gaming = "yo";
    }
    console.log("====new===");
    const rqSent = profile.profile.notifications.filter(
      (notif) => notif.userId === session?.user._id
    );
    const rqRecieved = session?.user?.notifications.filter(
      (notif) => notif.userId === profile.profile._id
    );
    console.log(rqRecieved, "rqrecieved");
    if (rqRecieved?.length > 0) {
      setRecievedRequest(true);
      setRecievedFrReqId(rqRecieved[0]._id);
      console.log("rqRecTrue");
    } else {
      console.log("rqRecFalse");
      setRecievedRequest(false);
    }
    if (rqSent.length > 0) {
      console.log("triggered");
      setSentRequest(true);
    }
    if (rqSent.length == 0) {
      setSentRequest(false);
    }
    // const onFriendsList = profile?.profile.friends.includes(session?.user._id);
    // const isTheUser = session?.user._id == profileId;

    // console.log(rqSent, "sent");
    // console.log("onFriendsList", onFriendsList);
    // console.log(sentRequest, "sentrqst");
    // console.log("isTheUser", isTheUser);
  }, [profile, session, recievedRequest, session?.user?.notifications]);

  function acceptRequest() {
    fetch(`${server}/api/notifications/acceptFriendRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        senderId: profile.profile._id,
        notificationId: recievedFrReqId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " api response");
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
    fetch(`${server}/api/notifications/declineFriendRequest`, {
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
      .then((data) => {
        console.log(data, " api response");
      });
  }
  return (
    <div className={styles.container}>
      <div style={{ borderBottom: "solid 1px white", paddingBottom: "20px" }}>
        <img className={styles.profile_picture} src={profile?.profile.image} />
        <h1 className={styles.username}>{profile?.profile.username}</h1>
        {!session ||
        session?.user._id == profileId ||
        profile?.profile.friends.includes(session?.user._id) ||
        sentRequest ||
        recievedRequest ? (
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
              document.querySelector("#removeFriend").style.display = "none";
              router.reload(window.location.pathname);
            }}
          >
            remove friend
          </span>
        ) : (
          ""
        )}
        {recievedRequest
          ? // <span
            //   onClick={() => {
            //     console.log("accept fr request");
            //     console.log(recievedFrReqId);
            //     acceptRequest();
            //   }}
            //   className={styles.addFriend}
            // >
            //   Accept Request
            // </span>
            ""
          : ""}
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
              return <FriendCard userId={e} />;
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
