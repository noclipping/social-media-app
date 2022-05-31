import { useSession } from "next-auth/react";
import React from "react";
import { server } from "../config";
import styles from "../styles/Notification.module.css";
export default function Notification({ notification }) {
  const { data: session } = useSession();
  console.log(notification._id);
  function acceptRequest() {
    fetch(`${server}/api/notifications/acceptFriendRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        senderId: notification.userId,
        notificationId: notification._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, " api response");
      });
  }
  return (
    <div className={styles.container}>
      {notification.username} {notification.message}{" "}
      <button
        onClick={() => {
          acceptRequest();
        }}
        className={styles.accept}
      >
        Accept
      </button>
      <button className={styles.decline}>Decline</button>
    </div>
  );
}
