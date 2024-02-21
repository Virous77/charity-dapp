import Charity from "@/components/charity/charity";

const HomePage = () => {
  return (
    <main className=" max-w-[1240px] m-auto mt-[90px] p-4">
      <section className=" flex flex-col gap-1 items-center justify-center mb-4">
        <h1 className=" font-bold text-4xl text-primary">Web3 Charity</h1>
        <p className=" mt-2 w-[95%] md:w-[80%] m-auto text-center">
          Welcome to <span className=" font-mono font-bold">Charity</span>,
          where every click makes a difference! Join us in revolutionizing
          philanthropy through blockchain technology. With our innovative
          decentralized application, you can seamlessly contribute to meaningful
          causes worldwide. Together, let&apos;s empower change, one transaction
          at a time.
        </p>
      </section>
      <Charity />
    </main>
  );
};

export default HomePage;
