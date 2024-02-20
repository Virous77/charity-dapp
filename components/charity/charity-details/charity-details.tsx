"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import CharityRaised from "./charity-raised";
import Donate from "./donate";
import { abi, address } from "@/constant/constant";
import { useReadContract } from "wagmi";
import { ICharity, ICharitySupport } from "@/interfaces/interfaces";
import { useMemo } from "react";
import Support from "./support";
import CharityMetadata from "./charity-metadata";
import { SkeletonCharityDetails } from "@/components/common/skeleton";

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

  return (
    <section>
      {isLoading ? (
        <SkeletonCharityDetails />
      ) : (
        <div className=" grid custom-grid gap-2">
          <div className=" max-h-[400px]">
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
              <CharityMetadata data={data} />
              <CardContent className=" p-0">
                <CharityRaised
                  amount={data.amount.toString()}
                  raised={data.raised.toString()}
                />

                <Support loading={loading} sortedSupports={sortedSupports} />
              </CardContent>
              <CardFooter className=" p-0 mt-7 ">
                <Donate id={+id} refetch={refetch} />
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      <div>
        <div>
          <h2 className=" text-xl font-bold font-sans mt-5">Description</h2>
          <p className=" text-sm  mt-1">{data?.description}</p>
        </div>
      </div>
    </section>
  );
};

export default CharityDetails;
