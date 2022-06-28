import Posts from "../../../models/postModel";
import AWS from "aws-sdk";
export default async function handler(req, res) {
  console.log(req.body.deleteUrl, "delurl");
  AWS.config.update({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION,
  });
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: req.body.deleteUrl, //if any sub folder-> path/of/the/folder.ext
  };
  try {
    await s3.headObject(params).promise();
    console.log("File Found in S3");
    try {
      await s3.deleteObject(params).promise();
      console.log("file deleted Successfully");
    } catch (err) {
      console.log("ERROR in file Deleting : " + JSON.stringify(err));
    }
  } catch (err) {
    console.log("File not Found ERROR : " + err.code);
  }

  Posts.findByIdAndDelete(req.body.postId, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
      res.status(200).json({ docs });
    }
  });
}
