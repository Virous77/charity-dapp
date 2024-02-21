export default async function sitemap() {
  const URL = "https://charity-next-dapp.vercel.app/";

  const restUrls = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${URL}/create`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      url: `${URL}/charity/1/Donate-funds-to-Childrens-always`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly",
    },
  ];

  return [...restUrls];
}
