import { loginUser } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-that-is-long-enough';
const COOKIE_NAME = 'jwt_token';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }
    
    const { token, user } = await loginUser(email, password, SECRET_KEY);

    const cookie = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
