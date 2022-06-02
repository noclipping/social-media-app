import { server } from "../../config";
export default function cancelFriendRequest(username, userId, recipient) {
  fetch(`${server}/api/notifications/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "friendRequest",
      message: "wants to be your friend.",
      username,
      userId,
      recipient,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, " api response");
    });
}
