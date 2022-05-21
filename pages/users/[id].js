import React from "react";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import styles from "../../styles/Profile.module.css";
export default function User({ profile }) {
  console.log(profile, "profile");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div style={{ borderBottom: "solid 1px white", paddingBottom: "20px" }}>
        <img className={styles.profile_picture} src={profile?.profile.image} />
        <h1 className={styles.username}>{profile?.profile.username}</h1>
      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const res = await fetch(`${server}/api/users/${query.id}`);
  const profile = await res.json();
  return {
    props: {
      profile,
    },
  };
}
