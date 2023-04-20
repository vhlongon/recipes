import { getUser } from '@/lib/data';
import { getErrorMessage } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      const message = 'not authorized';
      return NextResponse.json(
        { data: { message } },
        {
          status: 403,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { user } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: unknown) {
    const message = `could not get user: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
