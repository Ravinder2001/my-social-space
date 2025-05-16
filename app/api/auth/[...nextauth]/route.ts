import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import Config from "@/lib/config";
import CONSTANTS from "@/components/utils/constants";

// Define the expected JWT payload structure
interface JWTPayload {
  id: number;
  name: string;
  profile_picture: string;
  iat?: number;
  exp?: number;
  iss?: string;
  role?: string;
}

// Extend the default User type to ensure id is included
interface ExtendedUser extends User {
  id: string;
  name: string;
  profile_picture?: string; // Optional to handle cases where it might not be set
  token?: string; // Optional for the JWT token
}

// Define the expected API response structure
interface ApiResponse {
  success: number;
  message: string;
  data: {
    token: string;
  };
}

export const authOptions: NextAuthOptions = {
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        full_name: { label: "Full Name", type: "text" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          // Check if this is a signup attempt (name provided)
          const url = credentials.full_name
            ? `${Config.API_BASE_URL}${CONSTANTS.API_ROUTES.SIGNUP}`
            : `${Config.API_BASE_URL}${CONSTANTS.API_ROUTES.LOGIN}`;

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              ...(credentials.full_name && { full_name: credentials.full_name, gender: "M" }),
            }),
          });

          if (response.status === 200 || response.status === 201) {
            const data: ApiResponse = await response.json();
            if (data.success && data.data.token) {
              // Decode JWT to extract id, name, and email
              const decoded = jwt.decode(data.data.token) as JWTPayload | null;
              if (decoded && typeof decoded === "object") {
                return {
                  id: decoded.id.toString(),
                  profile_picture: decoded.profile_picture,
                  name: decoded.name,
                  token: data.data.token, // Store token in user object
                };
              }
            }
          }
          return null;
        } catch (error) {
          console.error("Error in Credentials authorize:", error);
          throw new Error("Invalid credentials or signup failed");
        }
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
    async signIn({ user, account }: any): Promise<boolean> {
      try {
        if (account?.provider === "google") {
          // Check if Google user exists or create new user (not using signup endpoint)
          const response = await fetch(
            `${Config.API_BASE_URL}${CONSTANTS.API_ROUTES.GOOGLE_SIGNIN}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: account.id_token,
              }),
            }
          );

          if (response.status === 200 || response.status === 201) {
            const data: ApiResponse = await response.json();
            if (data.success && data.data.token) {
              // Decode JWT to extract id, name, and email
              const decoded = jwt.decode(data.data.token) as JWTPayload | null;
              if (decoded && typeof decoded === "object") {
                // Ensure user.id is set to the decoded JWT id, not Google's ID
                (user as ExtendedUser).id = decoded.id.toString();
                user.profile_picture = decoded.profile_picture;
                user.name = decoded.name;
                (user as any).token = data.data.token; // Store token in user object
                return true;
              }
            }
            return false;
          }
        }
        // For credentials provider, authorize handles validation
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }: any): Promise<Record<string, any>> {
      if (user) {
        token.id = user.id;
        token.profile_picture = user.profile_picture;
        token.name = user.name;
        token.authToken = (user as any).token; // Store token in JWT
      }
      return token;
    },
    async session({ session, token }: any): Promise<any> {
      if (token) {
        session.user.id = token.id;
        session.user.profile_picture = token.profile_picture;
        session.user.name = token.name;
        session.user.authToken = token.authToken;
      }
      return session;
    },
  },
  secret: Config.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
