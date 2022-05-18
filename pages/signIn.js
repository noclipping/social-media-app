import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from "next-auth/react";
import Router from "next/router";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/Signin.module.css";

export default function signInPage({ csrfToken, providers }) {
  const [email, setEmail] = useState(""); // might be an error cause i have 2 email forms / ids / names below. watch the vid maybe he fixes it idk.
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { data: session } = useSession();
  const signInUser = async (e) => {
    e.preventDefault();
    let options = { redirect: false, email, password };
    console.log(options);
    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    } else {
      return Router.push("/");
    }
    console.log(email, password);
  };

  const signupUser = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }

    if (data.message === "Registered successfully") {
      let options = { redirect: false, email, password };
      const res = await signIn("credentials", options);
      return Router.push("/");
    }
  };
  return (
    <div className={styles.container}>
      <form action="">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label>
            Email address
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <p style={{ color: "red" }}>{message}</p>
        <button className={styles.button} onClick={(e) => signInUser(e)}>
          Sign In
        </button>
        <br />
        <button className={styles.button} onClick={(e) => signupUser(e)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
export async function getServerSideProps(context) {
  console.log(context);
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
