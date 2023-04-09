import { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';

type UserJWTPayload = Pick<User, 'email' | 'id'>;

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
