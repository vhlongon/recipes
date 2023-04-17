import { getUserFromCookies } from '@/lib/cookies';
import { updateUserSettings } from '@/lib/data';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const body = await request.json();

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

    const settings = await updateUserSettings(body);

    if (!settings) {
      const message = `settings with id: ${body.id} not found`;
      return NextResponse.json(
        { data: { message } },
        {
          status: 404,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { settings } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    const message = `could not update settings: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
