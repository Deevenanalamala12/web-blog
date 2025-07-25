import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth';

const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-that-is-long-enough';
const COOKIE_NAME = 'jwt_token';

// The paths that should be protected
const protectedPaths = ['/create', '/posts/[slug]/edit'];

function isProtected(path: string) {
    return protectedPaths.some(protectedPath => {
        // Simple match
        if(protectedPath === path) return true;
        // Match dynamic routes like /posts/[slug]/edit
        if (protectedPath.includes('[slug]')) {
            const regex = new RegExp(protectedPath.replace('[slug]', '[^/]+'));
            return regex.test(path);
        }
        return false;
    });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (isProtected(pathname)) {
    if (!token) {
      // Redirect to login page if no token
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token
      const decoded = await verifyToken(token, SECRET_KEY);
      if (!decoded) {
        throw new Error("Invalid token");
      }
      // Token is valid, proceed to the requested page
      return NextResponse.next();
    } catch (err) {
      // Token verification failed, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      // We can also clear the invalid cookie
      const response = NextResponse.redirect(url);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/create', '/posts/:path*/edit'],
}
