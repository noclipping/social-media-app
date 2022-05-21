import React from "react";
import server from "../config/index";
import styles from "../styles/Post.module.css";
export default function Post() {
  return <div></div>;
}
export async function getServerSideProps() {
  fetch(`${server}/api/posts`);
}
