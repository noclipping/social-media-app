import React from "react";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import styles from "../../styles/Profile.module.css";
import Post from "../../components/Post";
import { useSession } from "next-auth/react";
import { useState } from "react";
import sendFriendRequest from "../functions/sendFriendRequest";
export default function User({ profile, posts, profileId }) {
  const { data: session } = useSession();
  const [sentRequest, setSentRequest] = useState(false);

  console.log(profile, "profile");
  console.log(profileId, "profid");
  function handleFrRequest() {
    sendFriendRequest(session.user.username, session.user._id, profileId);
  }
  return (
    <div className={styles.container}>
      <div style={{ borderBottom: "solid 1px white", paddingBottom: "20px" }}>
        <img className={styles.profile_picture} src={profile?.profile.image} />
        <h1 className={styles.username}>{profile?.profile.username}</h1>
        {session?.user._id == profileId ? (
          ""
        ) : (
          <div
            onClick={() => {
              handleFrRequest();
            }}
          >
            add friend
          </div>
        )}
      </div>
      {posts?.posts.map((post) => {
        return <Post post={post} key={post._id} profile={true} />;
      })}
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
