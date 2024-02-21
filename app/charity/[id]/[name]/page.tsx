import CharityDetails from "@/components/charity/charity-details/charity-details";
import { commonMetaData } from "@/utils/utils";

export async function generateMetadata({
  params,
}: {
  params: { id: string; name: string };
}) {
  const urlName = params.name.replace(/-/g, " ");
  const metaData = commonMetaData({
    name: `${urlName} | Charity`,
    desc: "Always be giving back to the community. Charity is key. Charity makes it easy for you to get started and be full transparent with your donors. Wagmi",
    image:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1708533691/android-chrome-512x512_lmq9mv.png",
    url: `/charity/${params.id}/${params.name}`,
  });
  return {
    ...metaData,
  };
}

const CharityPage = async ({
  params,
}: {
  params: { id: string; name: string };
}) => {
  return (
    <main className="max-w-[1240px] m-auto mt-[90px] p-4">
      <CharityDetails id={params.id} />
    </main>
  );
};

export default CharityPage;
