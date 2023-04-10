import { Recipe, User } from '@prisma/client';

type FetchOpts = Omit<RequestInit, 'body'> & { body?: object; json?: boolean };

export const fetchData = async (url: RequestInfo | URL, opts: FetchOpts) => {
  const { body, json = true, headers, ...rest } = opts || {};
  const res = await fetch(url, {
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    throw new Error(`${res.statusText}`);
  }

  if (json) {
    return await res.json();
  }

  return res;
};

export type UserInput = Pick<
  User,
  'email' | 'password' | 'firstName' | 'lastName'
>;

export const register = async (userInput: UserInput) => {
  return fetchData('/api/register', {
    method: 'POST',
    body: userInput,
  });
};

export const signin = async (userInput: UserInput) => {
  return fetchData('/api/signin', {
    method: 'POST',
    body: userInput,
  });
};

export type RecipeInput = Pick<
  Recipe,
  | 'type'
  | 'description'
  | 'ingredients'
  | 'portions'
  | 'preparationTime'
  | 'kcal'
  | 'title'
>;
export const createRecipe = async (recipeInput: RecipeInput) => {
  return fetchData('/api/recipe', {
    method: 'POST',
    body: recipeInput,
  });
};

export const generateRecipe = async (recipeInput: RecipeInput) => {
  return fetchData('/api/generate-recipe', {
    method: 'POST',
    body: recipeInput,
  });
};

export const updateRecipe = async (
  recipeInput: RecipeInput & { id: string }
) => {
  return fetchData('/api/update-recipe', {
    method: 'POST',
    body: recipeInput,
  });
};

export const deleteRecipe = async (id: string) => {
  return fetchData('/api/delete-recipe', {
    method: 'POST',
    body: { id },
  });
};

export const protect = async (password: string) => {
  return fetchData('/api/protect', {
    method: 'POST',
    body: { password },
  });
};
