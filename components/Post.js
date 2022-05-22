import { useSession } from "next-auth/react";
import React from "react";
import server from "../config/index";
import styles from "../styles/Post.module.css";
export default function Post() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://i.stack.imgur.com/34AD2.jpg"
          style={{
            display: "inline-block",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            margin: "5px",
          }}
        />
        <div style={{ display: "inline-block" }}>Poster username</div>
      </div>
      <p className={styles.content}>
        Enim cupidatat ullamco qui excepteur enim veniam reprehenderit anim
        commodo deserunt. Enim adipisicing non nisi et ex amet eu laboris
        cupidatat consequat in do. Voluptate fugiat fugiat cillum fugiat non
        nisi sunt. Ullamco dolore Lorem officia do cillum nisi laboris veniam
        nulla veniam adipisicing commodo aute. Consectetur et et veniam sint
        ullamco qui occaecat consectetur enim officia ullamco. Est Lorem est
        cupidatat velit laborum sit anim elit in duis occaecat sint ipsum id.
        Eiusmod eu aliquip velit id. Ut cupidatat est sit do in duis minim
        reprehenderit. Est reprehenderit eiusmod voluptate pariatur non sit
        exercitation ad ea laboris nisi. Nisi labore cillum ut voluptate id
        laboris laboris deserunt. Aute est culpa aliqua voluptate. Velit dolore
        qui sint excepteur aliqua ea culpa enim magna. Et officia eu id
        adipisicing pariatur sint. Pariatur irure nulla nisi eu dolore in minim
        do tempor. Fugiat in elit nisi do ullamco anim ullamco consectetur. Ea
        esse elit amet sit do dolore.
      </p>
      <div>Comments</div>
      <br />
      <div>
        <form>
          <div>comment as {session?.user.username} </div>
          <br />
          <input placeholder="comment" style={{ width: "80%" }} />
          <button style={{ width: "20%" }}>Submit</button>
        </form>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  fetch(`${server}/api/posts`);
}
