import { createJWT } from '@/lib/auth';
import { getUserByEmail } from '@/lib/data';
import { comparePassword } from '@/lib/password';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await getUserByEmail(body.email);

    if (!user) {
      const message = 'Invalid login';
      return NextResponse.json(
        { data: { message } },
        {
          status: 401,
          statusText: message,
        }
      );
    }

    const isUser = await comparePassword(body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      return NextResponse.json(
        { data: { message: 'User created' } },
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
      const message = `invalid login`;
      return NextResponse.json(
        { data: { message } },
        { status: 401, statusText: message }
      );
    }
  } catch (error: any) {
    const message = 'An error ocurred';
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
