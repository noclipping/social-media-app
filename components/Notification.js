import { useSession } from "next-auth/react";
import React from "react";
import { server } from "../config";
import styles from "../styles/Notification.module.css";
export default function Notification({ removeNotif, notification }) {
  const { data: session } = useSession();
  console.log(notification._id);
  function declineRequest() {
    fetch(`${server}/api/notifications/declineFriendRequest`, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

          removeNotif(notification._id);
          // below : the probably super inefficient method of handling the
          // notification state in profiles
          session.user.notifications = [""];
        }}
        className={styles.accept}
      >
        Accept
      </button>
      <button
        className={styles.decline}
        onClick={() => {
          declineRequest();
          removeNotif(notification._id);
        }}
      >
        Decline
      </button>
    </div>
  );
}
