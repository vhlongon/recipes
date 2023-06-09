import { getUserFromCookies } from '@/lib/cookies';
import { deleteUser } from '@/lib/data';
import { getErrorMessage } from '@/lib/utils';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const user = await getUserFromCookies(cookies());

    if (!user) {
      const message = 'Not authorized';
      return NextResponse.json(
        { data: { message } },
        {
          status: 403,
          statusText: message,
        }
      );
    }

    const userDeleted = await deleteUser();

    if (!userDeleted) {
      const message = `user not found`;
      return NextResponse.json(
        { data: { message } },
        {
          status: 404,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { message: `user deleted` } },
      {
        status: 200,
        statusText: 'ok',
        headers: {
          'Set-Cookie': serialize(process.env.COOKIE_NAME || '', 'deleted', {
            httpOnly: true,
            path: '/',
            maxAge: -1,
          }),
        },
      }
    );
  } catch (error: unknown) {
    const message = `could not delete user: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
