import React from "react";
import styles from "../../styles/UsersIndex.module.css";
export default function Index() {
  return (
    <div className={styles.parent_container}>
      <div>1</div>
      <div>2</div>

      <div>3</div>

      <div>4</div>
    </div>
  );
}
export async function getServerSideProps() {
  const usersData = await fetch(`${server}/api/users`);
  const users = await postsData.json();
  return {
    props: {
      users,
    },
  };
}
