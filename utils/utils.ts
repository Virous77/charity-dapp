export const addressShortener = (address: string, length: number = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const charity = [
  {
    name: "Charity 1",
    description: "We are a charity that does good things. And we do them well.",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    totalFunds: 8,
    totalDonations: 3,
  },
  {
    name: "Charity 2",
    description: "We are a charity that does good things. And we do them well.",

    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    totalFunds: 23,
    totalDonations: 5,
  },

  {
    name: "Charity 3",
    description: "We are a charity that does good things. And we do them well.",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    totalFunds: 10,
    totalDonations: 2,
  },
];
