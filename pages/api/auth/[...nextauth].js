import NextAuth from "next-auth";
import clientPromise from "./lib/mongodb";
import connectDB from "./lib/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
connectDB();

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        console.log(credentials.email, credentials.password, "nextauthhting");
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("You haven't registered");
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
  ],
  secret: "secret",
  database: process.env.MONGODB_URI,
});

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password not correct");
  }
  console.log(user, "user");
  return user;
};
