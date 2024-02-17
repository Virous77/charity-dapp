import EthLogo from "@/components/common/eth-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { addressShortener, charity } from "@/utils/utils";
import Image from "next/image";
import CharityRaised from "./charity-raised";
import { HandCoins } from "lucide-react";
import Donate from "./donate";

const CharityDetails = () => {
  return (
    <section>
      <div className=" grid custom-grid gap-2">
        <div>
          <Image
            src={charity[0].image}
            alt="test"
            className=" w-full h-full rounded-lg"
            width={0}
            height={0}
            sizes="100%"
          />
        </div>
        <div>
          <Card className="p-2">
            <CardHeader className=" p-0">
              <h1 className=" text-2xl font-bold font-mono">
                {charity[0].name}
              </h1>

              <p className=" font-sans font-bold mt-2 text-lg flex items-center gap-1">
                <EthLogo />
                {charity[0].totalFunds} ETH
              </p>
            </CardHeader>
            <CardContent className=" p-0">
              <CharityRaised />

              <div>
                <h2 className=" text-xl font-bold font-sans mt-5">
                  Description
                </h2>
                <p className=" text-sm  mt-1">{charity[0].description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-sans mt-5">
                  Top Donation
                </h2>
                <div className=" flex items-center gap-2 mt-2">
                  <span className="w-[35px] h-[35px] rounded-full bg-muted flex items-center justify-center">
                    <HandCoins />
                  </span>

                  <div className=" flex flex-col">
                    <b className=" text-sm  mt-1">
                      {addressShortener("OXOTRT54GH85VD43VGGG445", 4)}
                    </b>
                    <span className="text-sm">3 ETH</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className=" p-0 mt-7 ">
              <Donate />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharityDetails;
