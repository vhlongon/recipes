import { getUserFromCookies } from '@/lib/cookies';
import { getUserRecipe, updateUserRecipe } from '@/lib/data';
import { uploadImage } from '@/lib/image';
import { getErrorMessage } from '@/lib/utils';
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
    const currentRecipe = await getUserRecipe(body.id);
    const recipeImage = image !== currentRecipe?.image ? await uploadImage(image, { width: 512, height: 341 }) : null;

    const recipe = await updateUserRecipe({
      ...(recipeImage ? { image: recipeImage } : {}),
      ...rest,
    });

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
  } catch (error: unknown) {
    const message = `could not update recipe: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
