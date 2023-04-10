import { encode, isValidProtectPassword } from '@/lib/protect';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const encodedPassword = encode(body.password);
    const isRightPassword = isValidProtectPassword(encodedPassword);

    if (!isRightPassword) {
      return NextResponse.json(
        { data: { message: 'Not authorized' } },
        {
          status: 403,
          statusText: 'Not authorized',
        }
      );
    }

    return NextResponse.json(
      { data: { message: 'ok' } },
      {
        status: 201,
        statusText: 'ok',
        headers: {
          'Set-Cookie': serialize(
            process.env.PROTECT_COOKIE_NAME,
            encodedPassword,
            {
              httpOnly: true,
              path: '/',
              maxAge: 999999,
            }
          ),
        },
      }
    );
  } catch (error: any) {
    const message = `not authorized: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
