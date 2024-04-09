export const isUrl = (input: string) => {
  try {
    return !!new URL(input);
  } catch {
    return false;
  }
};