import React from "react";
import styles from "../../styles/UsersIndex.module.css";
import { server } from "../../config";
import UserCard from "../../components/UserCard";
import { useEffect, useState } from "react";
export default function Index({ data }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(data.users);
    console.log("set!~");
  }, []);
  return (
    <div className={styles.parent_container}>
      {users
        ? users.map((user) => {
            return (
              <UserCard key={user._id} user={user} userFriends={user.friends} />
            );
          })
        : ""}
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
