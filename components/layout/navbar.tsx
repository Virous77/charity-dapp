import ThemeSwitcher from "@/lib/theme";
import ConnectButton from "@/lib/wagmi/wallet-modal";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" w-[95%] md:w-[80%] fixed top-10 m-auto z-[20] py-2 px-4 rounded-[30px] bg-muted  left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between">
      <Link href="/">
        <h1 className=" text-2xl font-mono cursor-pointer">Charity</h1>
      </Link>

      <div className=" flex items-center gap-4">
        <Link href="/create">
          <BadgePlus size={20} />
        </Link>
        <ThemeSwitcher />
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
