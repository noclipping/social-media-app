import React from "react";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import styles from "../../styles/Profile.module.css";
import Post from "../../components/Post";
export default function User({ profile, posts }) {
  console.log(profile, "profile");
  const router = useRouter();
  console.log(posts, "postas!");
  return (
    <div className={styles.container}>
      <div style={{ borderBottom: "solid 1px white", paddingBottom: "20px" }}>
        <img className={styles.profile_picture} src={profile?.profile.image} />
        <h1 className={styles.username}>{profile?.profile.username}</h1>
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
    },
  };
}
