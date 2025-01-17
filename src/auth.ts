import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import APIRoutes from "./utils/constants/APIRoutes";
import jwt from "jsonwebtoken"; // Import the jwt library
import axios from "axios";
import Config from "./utils/config";
import { PublicProjectRoutes } from "./utils/constants/ProjectRoutes";
import Messages from "./utils/constants/Messages";
import Constants from "./utils/constants/Constant";

export class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: Constants.PROVIDERS.CREDENTIALS,
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

            if (decoded && typeof decoded === Constants.COMMAN.OBJECT) {
              return {
                id: decoded.id,
                name: decoded.name,
                token,
              };
            }
            throw new InvalidLoginError(Messages.jwt.errors.invalidToken);
          } else {
            throw new InvalidLoginError(Messages.errors.server);
          }
        } catch (e: any) {
          throw new InvalidLoginError(e.response?.data?.message);
        }
      },
    }),
  ],
  pages: {
    signIn: PublicProjectRoutes.LOGIN,
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === Constants.PROVIDERS.GOOGLE) {
        try {
          // Validate Google token with your backend
          const response = await axios.post(`${Config.API_BASE_URL}${APIRoutes.GOOGLE_SIGN_IN}`, {
            token: account.id_token,
          });

          if (response.status === 200 && response.data.success === 1) {
            user.token = response.data.data.token;
            return user; // Successful Google sign-in
          }

          return false; // Reject sign-in if backend verification fails
        } catch (error) {
          console.log("Google Sign-In Error:", error);
          return false; // Reject sign-in if any error occurs
        }
      } else if (account?.provider === Constants.COMMAN.CREDENTIALS) {
        // Allow sign-in only if user exists
        return !!user;
      }

      return false; // Reject other providers
    },
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
