export const decode = (input: string) => atob(input);

export const encode = (input: string) => btoa(input);

export const isValidProtectPassword = (password: string) => {
  const hashedSecret = encode(process.env.PROTECT_SECRET);

  return hashedSecret === password;
};
