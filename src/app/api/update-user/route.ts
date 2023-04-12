import { getUserFromCookies } from '@/lib/cookies';
import { updateUser } from '@/lib/data';
import { uploadImage } from '@/lib/image';
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

    const { image, ...rest } = body;
    const userImage = image ? await uploadImage(image) : null;

    const dbUser = await updateUser({
      ...(image ? { image: userImage } : {}),
      ...rest,
    });

    if (!dbUser) {
      const message = `user with id: ${body.id} not found`;
      return NextResponse.json(
        { data: { message } },
        {
          status: 404,
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
  } catch (error: any) {
    const message = `could not update user: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
