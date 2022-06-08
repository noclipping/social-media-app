import Link from "next/link";
import React from "react";
import styles from "../styles/UserCard.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UserCard({ user, userFriends }) {
  const [isFriend, setIsFriend] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(userFriends);
    if (userFriends.includes(session?.user._id)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [session, user, session?.user, router]);
  return (
    <div className={styles.parent_container}>
      <img src="https://i.stack.imgur.com/34AD2.jpg" className={styles.img} />
      <Link href={`/users/${user._id}`}>
        <div style={{ cursor: "pointer" }}>{user.username}</div>
      </Link>
      {isFriend ? (
        <div></div>
      ) : (
        <button style={{ justifySelf: "end" }}>Add Friend</button>
      )}
    </div>
  );
}
