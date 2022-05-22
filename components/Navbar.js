import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session, "session");

  return (
    <div className={styles.parent_container}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Social-Humans™</Link>
        </div>
        <div className={styles.user_info_container}>
          {session ? (
            <div className={styles.user_info}>
              <img
                src={"https://i.stack.imgur.com/34AD2.jpg"}
                className={styles.image}
              />
              <p style={{ display: "inline-block" }}>
                <Link href={`/users/${session.user._id}`}>
                  {session.user.username}
                </Link>
              </p>
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.user_info}>
              <Image
                src="https://i.stack.imgur.com/34AD2.jpg"
                width="20px"
                height="20px"
              />

              <p style={{ display: "inline-block" }}>Guest</p>
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
