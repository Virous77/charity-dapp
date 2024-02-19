import CharityDetails from "@/components/charity/charity-details/charity-details";

const CharityPage = ({ params }: { params: { id: string; name: string } }) => {
  return (
    <main className="max-w-[1240px] m-auto mt-[90px] p-4">
      <CharityDetails id={params.id} />
    </main>
  );
};

export default CharityPage;
