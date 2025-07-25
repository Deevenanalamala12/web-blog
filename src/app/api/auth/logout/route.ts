import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const COOKIE_NAME = 'jwt_token';

export async function POST() {
  // To log out, we clear the cookie by setting its expiration date to the past.
  const cookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire immediately
    path: '/',
    sameSite: 'strict',
  });

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
      'Content-Type': 'application/json',
    },
  });
}
