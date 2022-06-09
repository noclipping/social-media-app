import Link from "next/link";
import React from "react";
import styles from "../styles/UserCard.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { server } from "../config";

export default function UserCard({ user, userFriends }) {
  const [isFriend, setIsFriend] = useState(false);
  const [rqSent, setRqSent] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const rqSent = user.notifications.filter(
      (notif) => notif.userId === session?.user._id
    );
    setRqSent(rqSent);
    console.log(rqSent, "rqsent");
    if (userFriends.includes(session?.user._id)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }

    if (rqSent.length > 0) {
      setIsFriend(true);
      console.log("triggered");
    }
  }, [session, user, session?.user, router]);
  function handleAddFriend() {
    // console.log(user._id);
    setIsFriend(true);
    const username = session.user.username;
    const userId = session.user._id;
    const recipient = user._id;
    fetch(`${server}/api/notifications/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "friendRequest",
        message: "wants to be your friend.",
        username,
        userId,
        recipient,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " api response");
      });
  }
  return (
    <div className={styles.parent_container}>
      <img src="https://i.stack.imgur.com/34AD2.jpg" className={styles.img} />
      <Link href={`/users/${user._id}`}>
        <div style={{ cursor: "pointer" }}>{user.username}</div>
      </Link>
      {isFriend ? (
        <div></div>
      ) : (
        <span
          className={styles.addFriend}
          style={{ justifySelf: "end" }}
          onClick={handleAddFriend}
        >
          Add Friend
        </span>
      )}
    </div>
  );
}
