import { validateJWT } from './auth';
import { db } from './db';

export const getUserFromCookies = async (cookies: {
  get: (key?: string) => string;
}) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  if (!jwt) {
    return null;
  }

  const payload = await validateJWT(jwt);

  if (!payload) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: payload.id },
  });

  return user;
};
