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
      return NextResponse.json(
        { message: 'Invalid login' },
        {
          status: 401,
          statusText: 'Invalid email',
        }
      );
    }

    const isUser = await comparePassword(body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      return NextResponse.json(
        { message: 'User created' },
        {
          status: 201,
          statusText: 'User created',
          headers: {
            'Set-Cookie': serialize(process.env.COOKIE_NAME || '', jwt, {
              httpOnly: true,
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            }),
          },
        }
      );
    } else {
      return NextResponse.json(
        { message: `invalid login` },
        { status: 401, statusText: `invalid login` }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: 'An error ocurred' },
      {
        status: 500,
        statusText: 'An error ocurred',
      }
    );
  }
}
