import { createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/password';
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
