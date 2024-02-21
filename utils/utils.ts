import zod from "zod";

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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

export const imageValidate = zod.object({
  image: zod
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .svg formats are supported."
    ),
});

export const commonMetaData = ({
  name,
  desc,
  image,
  url,
}: {
  name: string;
  desc: string;
  image: string;
  url: string;
}) => {
  return {
    metadataBase: new URL("https://charity-next.vercel.app"),
    title: name,
    description: desc,
    authors: [
      {
        name: "Reetesh Kumar",
        url: "https://reetesh.in/",
      },
    ],
    twitter: {
      card: "summary_large_image",
      creator: "@imbitcoinb",
      images: image,
    },
    robots: "index, follow",
    alternates: {
      canonical: `https://charity-next.vercel.app${url}`,
      languages: {
        "en-US": "/",
      },
    },
    openGraph: {
      type: "website",
      url: `https://charity-next.vercel.app${url}`,
      title: name,
      description: desc,
      siteName: "Charity",
      images: [
        {
          url: image,
        },
      ],
    },
    assets: image,
    keywords: [
      "Charity",
      "Charity Platform",
      "Blockchain",
      "Ethereum",
      "Charity Dapp",
    ],
  };
};
