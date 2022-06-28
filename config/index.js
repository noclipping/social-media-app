const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "social-media-btvr40a0s-noclipping.vercel.app"
  : "http://localhost:3000";
