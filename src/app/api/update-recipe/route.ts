import { getUserFromCookies } from '@/lib/cookies';
import { updateUserRecipe } from '@/lib/data';
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

    const recipe = await updateUserRecipe(body);

    if (!recipe) {
      const message = `recipe with id: ${body.id} not found`;
      return NextResponse.json(
        { data: { message } },
        {
          status: 404,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { recipe } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    const message = `could not update recipe: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
