import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

type UserJWTPayload = {
  id: string;
  email: string;
};

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createJWT = (payload: UserJWTPayload) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 60 * 60 * 24 * 7;

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(expiresAt)
    .setIssuedAt(issuedAt)
    .setNotBefore(issuedAt)
    .sign(encodedSecret);
};

export const validateJWT = async (token: string) => {
  const { payload } = await jwtVerify(token, encodedSecret);

  return payload as UserJWTPayload;
};

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
