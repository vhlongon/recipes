import { getUserFromCookies } from '@/lib/cookies';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await getUserFromCookies(cookies());

    if (!user) {
      return NextResponse.json(
        { data: { message: 'Not authorized' } },
        {
          status: 403,
          statusText: 'Not authorized',
        }
      );
    }

    const recipe = await db.recipe.create({
      data: {
        user: user.id,
        ...body,
      },
    });

    return NextResponse.json(
      { data: { message: `Recipe ${recipe.id} created` } },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: { message: 'could not create recipe' } },
      {
        status: 500,
        statusText: 'could not create recipe',
      }
    );
  }
}
