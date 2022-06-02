import React from "react";
import { useEffect } from "react";
import { server } from "../config";
import { useState } from "react";
import Link from "next/link";
export default function FriendCard({ userId }) {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const profe = fetch(`${server}/api/users/${userId}`)
      .then((res) => res.json())
      .then((prof) => {
        setProfile(prof);
      });
  }, [userId]);

  return (
    <div style={{ margin: "10px" }}>
      <img
        src={profile?.profile.image}
        style={{
          height: "20px",
          width: "20px",
          borderRadius: "50%",
        }}
      />
      <Link href={`/users/${profile?.profile._id}`}>
        <span
          style={{
            cursor: "pointer",
          }}
        >
          {" "}
          {profile?.profile.username}
        </span>
      </Link>
    </div>
  );
}
