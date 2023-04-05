import { User } from '@prisma/client';

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
    throw new Error(`API ERROR: [${res.status}] - [${res.statusText}]`);
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
    json: false,
  });
};

export const signin = async (userInput: UserInput) => {
  return fetchData('/api/signin', {
    method: 'POST',
    body: userInput,
    json: false,
  });
};
