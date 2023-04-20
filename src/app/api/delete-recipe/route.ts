import { getUserFromCookies } from '@/lib/cookies';
import { deleteUserRecipe } from '@/lib/data';
import { getErrorMessage } from '@/lib/utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
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

    const recipeDeleted = await deleteUserRecipe(body.id);

    if (!recipeDeleted) {
      const message = `recipe with id ${body.id} not found`;
      return NextResponse.json(
        { data: { message } },
        {
          status: 404,
          statusText: message,
        }
      );
    }

    return NextResponse.json(
      { data: { message: `recipe with id: ${recipeDeleted} deleted` } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: unknown) {
    const message = `could not delete recipe: ${getErrorMessage(error)}`;
    return NextResponse.json(
      { data: { message } },
      {
        status: 500,
        statusText: message,
      }
    );
  }
}
