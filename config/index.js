const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://social-media-app-murex.vercel.app";
// : `https://${process.env.VERCEL_URL}`;
