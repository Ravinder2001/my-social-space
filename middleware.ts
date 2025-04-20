import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the session token from the request
  const session = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  })

  // Define public and private routes
  const publicRoutes = ['/login', '/register']
  const privateRoutes = ['/', '/explore', '/messages', '/notifications', '/profile', '/settings']

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    // If user is authenticated, redirect to home
    if (session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Allow unauthenticated users to access public routes
    return NextResponse.next()
  }

  // Handle private routes
  if (privateRoutes.some((route) => pathname === route || pathname.startsWith(route))) {
    // If user is not authenticated, redirect to login
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      // loginUrl.searchParams.set('callbackUrl', pathname) // Preserve the intended URL
      return NextResponse.redirect(loginUrl)
    }
    // Allow authenticated users to access private routes
    return NextResponse.next()
  }

  // Allow access to all other routes (e.g., static assets, API routes)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/explore/:path*',
    '/messages/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
}