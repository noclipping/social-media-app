import Users from "../../../models/userModel";
import connectDB from "../auth/lib/connectDB";
export default async function handler(req, res) {
  console.log(req.body.currentUser, "user", req.body.bio, "bio");
  await Users.findOneAndUpdate(
    { _id: req.body.currentUser },
    {
      $set: { bio: req.body.bio },
    }
  ).then((data) => {
    res.status(200).send(data);
  });
}
