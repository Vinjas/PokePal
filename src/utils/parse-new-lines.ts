export const parseNewLines = (text: string) => {
  if (!text) return text;

  return text.replace(/\n/g, ' ');
};
