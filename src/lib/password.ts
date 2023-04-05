import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

type UserJWTPayload = {
  id: string;
  email: string;
};
