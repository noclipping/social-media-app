import React from "react";
import styles from "../styles/Notification.module.css";
export default function Notification({ notification }) {
  return (
    <div className={styles.container}>
      {notification.username} {notification.message}{" "}
      <button className={styles.accept}>Accept</button>
      <button className={styles.decline}>Decline</button>
    </div>
  );
}
