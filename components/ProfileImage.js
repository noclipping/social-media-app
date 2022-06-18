import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { server } from "../config";
import { BiUpload } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function ProfileImage({ changeImage }) {
  const { data: session } = useSession();
  let [imageUrl, setImageUrl] = useState();

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);

    setImageUrl(url);
    fetch(`${server}/api/users/uploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        url: url,
        deleteUrl: session.user.image.slice(48),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      });
    changeImage(url);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <FileInput onChange={handleFileChange} />

      <BiUpload
        style={{
          backgroundColor: "black",
          border: "solid 1px white",
          borderRadius: "30px",
          cursor: "pointer",
        }}
        color="white"
        size="30px"
        onClick={() => {
          openFileDialog();
        }}
      />

      {/* <button
        onClick={() => {
          console.log(session.user.image.slice(48), "yo");
        }}
      >
        uhh yeahsasdadasd
      </button> */}
    </div>
  );
}
