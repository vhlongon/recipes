import { validateJWT } from './auth';
import { db } from './db';
import { cookies as nextCookies } from 'next/headers';

export const getUserFromCookies = async (
  cookies: ReturnType<typeof nextCookies>
) => {
  const jwt = cookies.get(process.env.COOKIE_NAME ?? '')?.value;

  if (!jwt) {
    return null;
  }

  const payload = await validateJWT(jwt);

  if (!payload) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: payload.id },
    include: {
      recipes: true,
    },
  });

  return user;
};
