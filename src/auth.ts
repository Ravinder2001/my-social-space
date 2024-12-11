import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // Import axios for API requests

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (cred) => {
        try {
          console.log(cred);
          // Make a request to your backend login API
          const response = await axios.post(`http://localhost:7777/user/login`, {
            email: cred.email,
            password: cred.password,
          });

          // Check if the API response indicates success
          if (response.status === 200 && response.data.success == 1) {
            console.log("user logged in", response.data.data.token);
            return {
              id: "123123asdasd",
              name: "ravinder",
              email: "test@gmail.com",
              token: response.data.data.token,
            };
          } else {
            // Return null if login fails
            return null;
          }
        } catch {
          //   console.error("Error during login:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
