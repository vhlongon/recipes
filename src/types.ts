import { User } from '@prisma/client';

export type ContextUser = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'image'
>;
