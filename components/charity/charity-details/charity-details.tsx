"use client";

import EthLogo from "@/components/common/eth-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import CharityRaised from "./charity-raised";
import Donate from "./donate";
import { abi, address } from "@/constant/constant";
import { useReadContract } from "wagmi";
import { ICharity, ICharitySupport } from "@/interfaces/interfaces";
import SupportList from "./support-list";
import { useMemo } from "react";

const CharityDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useReadContract({
    functionName: "getCharity",
    abi,
    address,
    args: [Number(id)],
  }) as { data: ICharity; isLoading: boolean };

  const {
    data: supports,
    isLoading: loading,
    refetch,
  } = useReadContract({
    functionName: "getSupports",
    abi,
    address,
    args: [Number(id)],
  }) as { data: ICharitySupport[]; isLoading: boolean; refetch: () => void };

  const sortedSupports = useMemo(() => {
    if (!supports) return [];
    return supports
      .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
      .slice(0, 3);
  }, [supports]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className=" grid custom-grid gap-2">
        <div>
          <Image
            src={data.image}
            alt={data.name}
            className=" w-full h-full rounded-lg"
            width={0}
            height={0}
            sizes="100%"
          />
        </div>
        <div>
          <Card className="p-2">
            <CardHeader className=" p-0">
              <h1 className=" text-2xl font-bold font-mono capitalize">
                {data.name}
              </h1>

              <p className=" font-sans font-bold mt-2 text-lg flex items-center gap-1">
                <EthLogo />
                {data.amount.toString()} ETH
              </p>
            </CardHeader>
            <CardContent className=" p-0">
              <CharityRaised
                amount={data.amount.toString()}
                raised={data.raised.toString()}
              />

              <div>
                <h2 className=" text-xl font-bold font-sans mt-5">
                  Description
                </h2>
                <p className=" text-sm  mt-1">{data.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-sans mt-5">
                  Top Donation
                </h2>
                <ul className=" flex flex-col">
                  {sortedSupports.map((support) => (
                    <SupportList key={support.id.toString()} {...support} />
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className=" p-0 mt-7 ">
              <Donate id={+id} refetch={refetch} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharityDetails;
