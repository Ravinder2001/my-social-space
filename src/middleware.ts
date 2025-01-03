import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { PrivateProjectRoutes, PublicProjectRoutes } from "./utils/constants/ProjectRoutes";

// 1. Specify protected and public routes
const protectedRoutes = Object.values(PrivateProjectRoutes);
const publicRoutes = Object.values(PublicProjectRoutes);

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await auth();

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL(PublicProjectRoutes.LOGIN, req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL(PrivateProjectRoutes.HOME, req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
