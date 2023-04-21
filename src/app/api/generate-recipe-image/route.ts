import { getUserFromCookies } from '@/lib/cookies';
import { generateImageRecipe } from '@/lib/replicate';
import { getErrorMessage } from '@/lib/utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await getUserFromCookies(cookies());

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
  const body = await request.json();

  try {
    const image = await generateImageRecipe(body);

    return NextResponse.json(
      {
        data: {
          image,
        },
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: unknown) {
    const message = `could not generate new image for the recipe: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
