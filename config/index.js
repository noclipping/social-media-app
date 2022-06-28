const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "social-media-app-murex.vercel.app"
  : "http://localhost:3000";
