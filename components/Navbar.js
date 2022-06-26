import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiBell, BiSearchAlt2, BiLogOut } from "react-icons/bi";
import Notification from "./Notification";
import { useState } from "react";
import { useEffect } from "react";
export default function Navbar() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [notifsLength, setNotifsLength] = useState(0);
  const { data: session } = useSession();
  const removeNotif = (notifKey) => {
    console.log("removed", notifKey, "notif");
    setNotifs((prevState) => {
      // return an array with the notif removed
      const newArry = prevState.filter((e) => e._id !== notifKey);
      return newArry;
    });
    setNotifsLength(notifsLength - 1);
  };
  useEffect(() => {
    setNotifsLength(session?.user.notifications.length);
    function func(e) {
      if (document.getElementById("dropdown").contains(e.target)) {
        // Clicked in box
        setOpenNotifications(true);

        document.querySelector("#dropdownContent").style.display = "block";
      } else {
        // Clicked outside the box

        setOpenNotifications(false);
        document.querySelector("#dropdownContent").style.display = "none";
      }
    }
    setNotifs(session?.user?.notifications);

    window.addEventListener("click", func);

    return function cleanUpEventListener() {
      window.removeEventListener("click", func);
    };
  }, [session]);
  function notificationHandler() {
    setOpenNotifications(!openNotifications);
    document.querySelector("#dropdownContent").style.display = openNotifications
      ? "block"
      : "none";
  }

  return (
    <div className={styles.parent_container}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Social-Humans™</Link>
        </div>
        <div className={styles.usersIndex}>
          <Link href="/users/">
            <div>
              <BiSearchAlt2 style={{ cursor: "pointer" }} size="30px" />
            </div>
          </Link>
        </div>
        <div className={styles.user_info_container}>
          {session ? (
            <div className={styles.user_info}>
              <div className={styles.dropdown} id="dropdown">
                <div
                  onClick={() => {
                    notificationHandler();
                  }}
                >
                  <BiBell style={{ marginRight: "20px" }} size="24px" />

                  {notifsLength > 0 ? (
                    <span className={styles.notificationCount}>
                      {notifsLength}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div id="dropdownContent" className={styles.dropdownContent}>
                  {notifs?.length > 0 ? (
                    notifs.map((e) => {
                      return (
                        <Notification
                          removeNotif={removeNotif}
                          key={e._id}
                          notification={e}
                        />
                      );
                    })
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              </div>

              <Link href={`/users/${session.user._id}`}>
                <div style={{ display: "inline-block" }}>
                  <img src={session.user.image} className={styles.image} />
                  <p className={styles.username}>{session.user.username}</p>
                </div>
              </Link>
              <span
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <BiLogOut size="24px" />
              </span>
            </div>
          ) : (
            <div className={styles.user_info}>
              <div className={styles.dropdown} id="dropdown">
                <div
                  onClick={() => {
                    notificationHandler();
                  }}
                >
                  <BiBell
                    style={{ marginRight: "20px", marginBottom: "-8px" }}
                    size="24px"
                  />

                  {session?.user.notifications.length > 0 ? (
                    <span className={styles.notificationCount}>
                      {session?.user.notifications.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  id="dropdownContent"
                  style={{ minWidth: "300px", left: "-100px" }}
                  className={styles.dropdownContent}
                >
                  <p>No notifications</p>
                </div>
              </div>
              <Link href="/signIn">
                <button className={styles.button}>Sign In</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
