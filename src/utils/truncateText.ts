export const truncateText = (text: string, size: number) => {
  if (text.length > size) {
    return text.trim().substring(0, size).concat("...");
  }

  return text;
};
