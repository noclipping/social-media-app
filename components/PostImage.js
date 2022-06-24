import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { server } from "../config";
import { AiOutlinePaperClip } from "react-icons/ai";
export default function UploadTest({ setTheFile, handleFileChange }) {
  const [img, setImg] = useState();
  const [displayState, setDisplayState] = useState("none");

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  //   let handleFileChange = async (file) => {
  //     setImg(URL.createObjectURL(file));
  //     try {
  //       setImg(URL.createObjectURL(file));
  //     } catch {
  //       console.log("canceled img");
  //       return;
  //     }

  //     setDisplayState("inline-block");
  //     setTheFile(file);
  //     console.log("epicness");
  //   };

  return (
    <div
      style={{
        display: "inline-block",
      }}
    >
      <FileInput
        onChange={(file) => {
          handleFileChange(file);
        }}
      />
      <AiOutlinePaperClip
        size="35px"
        cursor="pointer"
        onClick={openFileDialog}
      />
      <br />
      {/* <img
        style={{ width: "200px", height: "200px", display: `${displayState}` }}
        src={img}
        alt=""
      /> */}

      {/* {imageUrl && (
        <div
          style={{
            display: "inline-block",
            position: "relative",
            border: "solid 1px red",
          }}
        >
          <img
            style={{
              borderRadius: "50%",
              height: "100px",
              width: "100px",
            }}
            src={imageUrl}
          />
        </div>
      )} */}
      {/* <button
        style={{ backgroundColor: "white", cursor: "pointer" }}
        onClick={async () => {
          console.log(session.user.image.slice(48));
          if (!theFile) {
            console.log("no file :(");
            return;
          }
          let { url } = await uploadToS3(theFile);

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
        }}
      >
        CLICK HERE
      </button> */}
    </div>
  );
}
