import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import EthLogo from "../common/eth-logo";
import { Users } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ICharity } from "@/interfaces/interfaces";

const CharityList: React.FC<ICharity> = ({
  name,
  description,
  image,
  amount,
  donations,
}) => {
  return (
    <Card className=" p-2  w-full md:w-[310px]">
      <CardHeader className=" p-0">
        <Image
          src={image}
          width={300}
          height={300}
          alt={name}
          className=" rounded-tl-[5px] rounded-tr-[5px] w-full"
        />
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <h2 className=" font-bold font-mono text-xl">{name}</h2>
        <p className=" text-sm leading-5 mt-1">{description}</p>
        <div className=" flex items-center gap-4 mt-2">
          <p className=" font-bold font-sans text-lg mt-2 flex items-center gap-1">
            <EthLogo />
            {amount.toString()} ETH
          </p>
          <Separator
            orientation="vertical"
            className="w-1 h-4 mt-2 bg-primary"
          />
          <p className=" font-bold  text-lg mt-2 font-sans flex items-center gap-2">
            <Users size={20} />
            {donations.toString()} Donations
          </p>
        </div>
      </CardContent>
      <CardFooter className=" p-0 mt-3 w-full ">
        <Link
          href="/charity/name"
          className=" w-full bg-primary text-center p-[6px] text-background hover:opacity-90 rounded"
        >
          Donate
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CharityList;
