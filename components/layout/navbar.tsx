import ConnectButton from "@/lib/wagmi/wallet-modal";

const Navbar = () => {
  return (
    <nav className=" w-[80%] fixed top-10 m-auto z-[20] py-2 px-4 rounded-[30px] bg-muted  left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between">
      <h1 className=" text-2xl font-mono cursor-pointer">Charity</h1>

      <ConnectButton />
    </nav>
  );
};

export default Navbar;
