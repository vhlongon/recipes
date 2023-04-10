import { getUserFromCookies } from '@/lib/cookies';
import { createUserRecipe } from '@/lib/data';
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

    const recipe = await createUserRecipe(body);

    if (!recipe) {
      const message = `could not create recipe with title: ${body.title}`;
      return NextResponse.json(
        { data: { message: message } },
        {
          status: 500,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { message: `Recipe ${recipe.id} created` } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    const message = `could not create recipe: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}