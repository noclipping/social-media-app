import React from "react";
import styles from "../../styles/UsersIndex.module.css";
import { server } from "../../config";
import UserCard from "../../components/UserCard";
export default function Index({ data }) {
  console.log(data.users);
  const users = data.users;
  return (
    <div className={styles.parent_container}>
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const usersData = await fetch(`${server}/api/users`);
  const data = await usersData.json();
  return {
    props: {
      data,
    },
  };
}
