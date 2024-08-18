// [...nextauth].js

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {  
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Fetch the user from the database
        const user = await User.findOne({ email: credentials.email });
        
        // Verify user password
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user;
        }
        
        throw new Error("Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Customize the sign-in page
  },
  database: process.env.MONGODB_URI, // MongoDB connection string
  secret: process.env.NEXTAUTH_SECRET, // Secret for encryption
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async session({ session, user }) {
      // Attach user ID to session
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Attach user ID to JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
