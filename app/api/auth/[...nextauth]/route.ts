import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🚀 account:", account);
      try {
        // await connectToDB();
        // // Check if user exists
        // let dbUser = await User.findOne({ googleId: account.providerAccountId });

        // console.log("🚀 dbUser:", dbUser);

        // if (!dbUser) {
        //   return `/${CONSTANTS.PROJECT_ROUTES.LOGIN}?error=USER_NOT_FOUND`;
        // }
        // // Ensure the MongoDB _id is available for the JWT
        // user.id = dbUser._id.toString(); // Convert ObjectId to string

        return true; // Allow login if user exists
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET || "your_secret_key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
