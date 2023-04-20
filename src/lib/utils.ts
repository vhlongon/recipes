export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getErrorMessage = (error: unknown) => (isObject(error) && 'message' in error ? String(error.message) : '');
