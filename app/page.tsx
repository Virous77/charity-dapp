import Charity from "@/components/charity/charity";

const HomePage = () => {
  return (
    <main className=" max-w-[1240px] m-auto mt-[90px] p-4">
      <section className=" flex flex-col gap-1 items-center justify-center mb-4">
        <h1 className=" font-bold text-4xl text-primary">Web3 Charity</h1>
        <p className=" mt-2 w-[95%] md:w-[80%] m-auto text-center">
          Always be giving back to the community. We are a charity that does
          good things. And we do them well.
        </p>
      </section>
      <Charity />
    </main>
  );
};

export default HomePage;
