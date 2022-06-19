import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { server } from "../config";
import { BiUpload } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function ProfileImage({ changeImage }) {
  const { data: session } = useSession();
  let [imageUrl, setImageUrl] = useState();
  let [imgUrlChanged, setImgUrlChanged] = useState(false);
  const [newImgUrl, setNewImgUrl] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    let deletion = session.user.image.slice(48);
    if (imgUrlChanged) {
      console.log("triggered imgUrlChanged");
      deletion = newImgUrl;
    }
    setImageUrl(url);
    fetch(`${server}/api/users/uploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: session.user._id,
        url: url,
        deleteUrl: deletion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      });
    changeImage(url);
    setImgUrlChanged(true);
    setNewImgUrl(url.slice(48));
    console.log(setImgUrlChanged, "imgurlchanged \n");
    console.log(newImgUrl, "newImgUrl");
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
