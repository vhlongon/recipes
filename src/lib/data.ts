import { cookies } from 'next/headers';
import { getUserFromCookies } from './cookies';
import { db } from './db';

export const getUser = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: user.id,
    },
  });
};

export const getUsersRecipes = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return [];
  }

  return await db.recipe.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getUserRecipe = async (id: string) => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  return await db.recipe.findUnique({
    where: {
      id,
    },
  });
};

export const getUserRecipeCount = async () => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return 0;
  }

  return await db.recipe.count({
    where: {
      userId: user.id,
    },
  });
};
