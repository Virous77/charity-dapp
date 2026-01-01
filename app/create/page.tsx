import Create from "@/components/charity/charity-create/create";
import { commonMetaData } from "@/utils/utils";
import { initialState } from "../layout";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const metaData = commonMetaData({
    name: "Create | Charity",
    desc: "Always be giving back to the community. Charity is key. Charity makes it easy for you to get started and be full transparent with your donors. Wagmi",
    image:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1708533691/android-chrome-512x512_lmq9mv.png",
    url: "/create",
  });
  return {
    ...metaData,
  };
}

const CharityCreate = async () => {
  const data = await initialState();

  if (!data?.current) return redirect("/");

  return (
    <main className="max-w-[992px] m-auto mt-[90px] p-4">
      <Create />
    </main>
  );
};

export default CharityCreate;
