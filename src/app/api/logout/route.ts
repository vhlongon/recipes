import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/signin', request.url), {
    headers: {
      'Set-Cookie': serialize(process.env.COOKIE_NAME || '', 'deleted', {
        httpOnly: true,
        path: '/',
        maxAge: -1,
      }),
    },
  });
}
