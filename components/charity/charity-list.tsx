import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import EthLogo from "../common/eth-logo";
import { Users } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ICharity } from "@/interfaces/interfaces";
import { truncateAfter100Words, weiToEth } from "@/utils/utils";
import { useAccount } from "wagmi";
import CharityPopover from "./charity-popover";

type TCharityList = {
  charity: ICharity;
};

const CharityList: React.FC<TCharityList> = ({ charity }) => {
  const { address } = useAccount();

  return (
    <Card className=" p-2  w-full md:w-[310px] h-full">
      <CardHeader className=" p-0 relative">
        <Image
          src={charity.image}
          width={0}
          height={0}
          sizes="100vw"
          alt={charity.name}
          className=" rounded-tl-[5px] rounded-tr-[5px] h-[180px] w-full"
        />
        {address?.toLowerCase() === charity.owner.toLowerCase() && (
          <CharityPopover id={Number(charity.id)} />
        )}
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <h2 className=" font-bold font-mono text-xl  capitalize">
          {charity.name}
        </h2>
        <p className=" text-sm leading-5 mt-1">
          {truncateAfter100Words(charity.description)}
        </p>
        <div className=" flex items-center gap-4 mt-2">
          <p className=" font-bold font-sans text-lg mt-2 flex items-center gap-1">
            <EthLogo />
            {weiToEth(Number(charity.amount))} ETH
          </p>
          <Separator
            orientation="vertical"
            className="w-1 h-4 mt-2 bg-primary"
          />
          <p className=" font-bold  text-lg mt-2 font-sans flex items-center gap-2">
            <Users size={20} />
            {charity.donations.toString()} Donations
          </p>
        </div>
      </CardContent>
      <CardFooter className=" p-0 mt-3 w-full ">
        <Link
          href={`/charity/${charity.id}/${charity.name.split(" ").join("-")}`}
          className=" w-full bg-primary text-center p-[6px] text-background hover:opacity-90 rounded"
        >
          Donate
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CharityList;
