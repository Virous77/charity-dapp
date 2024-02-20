export const addressShortener = (address: string, length: number = 4) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const weiToEth = (weiAmount: number) => {
  return weiAmount / 1e18;
};

const month = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month];
};

export const dateFormatter = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${month(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`;
};

export const removeSiteHttp = (url: string) => {
  const formattedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  return formattedUrl.slice(-1) === "/"
    ? formattedUrl.slice(0, -1)
    : formattedUrl;
};

export const truncateAfter100Words = (text: string) => {
  const match = text.match(/^(\S+\s*){1,30}\./);
  return match ? match[0] : text;
};
