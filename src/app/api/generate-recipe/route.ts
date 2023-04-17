import { getUserFromCookies } from '@/lib/cookies';
import { generateRecipeCompletion } from '@/lib/openai';
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
    const { description, instructions, hashtags, image } =
      await generateRecipeCompletion(body);

    return NextResponse.json(
      {
        data: {
          description,
          instructions,
          hashtags,
          ingredients: body.ingredients,
          preparationTime: body.preparationTime,
          type: body.type,
          portions: body.portions,
          kcal: body.kcal,
          title: body.title,
          image,
        },
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    const message = `could not generate recipe: ${error.message}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
