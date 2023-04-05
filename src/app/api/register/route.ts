import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await db.user.create({
      data: {
        email: body.email,
        password: await hashPassword(body.password),
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    const jwt = await createJWT({ id: user.id, email: user.email });

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
  } catch (error: any) {
    return new NextResponse('could not create user', {
      status: 500,
      statusText: 'already have a user with this email',
    });
  }
}
