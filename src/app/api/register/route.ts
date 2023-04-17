import { createJWT } from '@/lib/auth';
import { createUser } from '@/lib/data';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await createUser(body);
    const jwt = await createJWT({ id: user.id, email: user.email });

    return NextResponse.json(
      { data: { user } },
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
  } catch (error: any) {
    return NextResponse.json(
      { data: { message: 'There is already have a user with this email' } },
      {
        status: 500,
        statusText: 'There is already have a user with this email',
      }
    );
  }
}
