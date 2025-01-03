import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import APIRoutes from "./utils/constants/APIRoutes";
import jwt from "jsonwebtoken"; // Import the jwt library
import axios from "axios";
import Config from "./utils/config";
import { PublicProjectRoutes } from "./utils/constants/ProjectRoutes";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (cred: any) => {
        try {
          const response = await axios.post(`${Config.API_BASE_URL}${APIRoutes.LOGIN}`, {
            email: cred.email,
            password: cred.password,
          });

          if (response.status === 200 && response.data.success === 1) {
            const token = response.data.data.token;
            const decoded = jwt.decode(token);
            if (decoded && typeof decoded === "object") {
              return {
                id: decoded.id,
                name: decoded.name,
                token,
              };
            }
            return null;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: PublicProjectRoutes.LOGIN,
  },
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      //add the values here if you want to get those values in auth session object
      session.user = {
        id: token.id,
        name: token.name,
        token: token.token,
      };
      return session;
    },
  },
});
