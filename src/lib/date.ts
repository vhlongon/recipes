export const formatDate = (date: Date, format?: Intl.LocalesArgument) => {
  const formatted = new Date(date).toLocaleDateString(format || 'en-GB', {
    dateStyle: 'medium',
  });

  return formatted;
};
