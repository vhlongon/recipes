import { getUserFromCookies } from '@/lib/cookies';
import { updateUserImage } from '@/lib/data';
import { uploadImage } from '@/lib/image';
import { getErrorMessage } from '@/lib/utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

    const url = await uploadImage(body.image);
    const image = await updateUserImage(url);

    if (!image) {
      const message = 'could not update user image';

      return NextResponse.json(
        { data: { message } },
        {
          status: 500,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { image } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: unknown) {
    const message = `could not upload user image: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
