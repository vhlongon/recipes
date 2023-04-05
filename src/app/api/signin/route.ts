import { comparePassword, createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return new NextResponse('failed to login', {
        status: 401,
        statusText: 'invalid login',
      });
    }

    const isUser = await comparePassword(body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      return new NextResponse('user created', {
        status: 201,
        statusText: 'Created',
        headers: {
          'Set-Cookie': serialize(process.env.COOKIE_NAME || '', jwt, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }),
        },
      });
    } else {
      return new NextResponse('failed to login', {
        status: 401,
        statusText: 'invalid login',
      });
    }
  } catch (error: any) {
    return new NextResponse('could not login user', {
      status: 500,
      statusText: 'could not login user',
    });
  }
}
