export const addressShortener = (address: string, length: number = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};