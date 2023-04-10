import { cookies } from 'next/headers';
import { getUserFromCookies } from './cookies';
import { db } from './db';
import { Recipe, User } from '@prisma/client';
import { hashPassword } from './password';

export const createUser = async (
  input: Pick<User, 'email' | 'firstName' | 'lastName' | 'password'>
) => {
  const { password, ...rest } = input;
  return await db.user.create({
    data: {
      ...rest,
      password: await hashPassword(password),
    },
  });
};
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

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
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

  const recipe = await db.recipe.findUnique({
    where: {
      id,
    },
  });

  if (recipe) {
    const { createdAt, updatedAt, ...rest } = recipe;
    return {
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...rest,
    };
  }

  return null;
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

export const createUserRecipe = async (recipe: Omit<Recipe, 'userId'>) => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  const { createdAt, updatedAt, ...rest } = await db.recipe.create({
    data: {
      userId: user.id,
      ...recipe,
    },
  });

  return {
    ...rest,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};

export const updateUserRecipe = async (recipe: Partial<Recipe>) => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  const { id, ...rest } = recipe;

  return await db.recipe.update({
    where: {
      id,
    },
    data: {
      ...rest,
    },
  });
};

export const deleteUserRecipe = async (id: string) => {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return null;
  }

  await db.recipe.delete({
    where: {
      id,
    },
  });

  return id;
};
