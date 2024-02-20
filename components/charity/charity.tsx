"use client";

import CharityList from "./charity-list";
import { useReadContract } from "wagmi";
import { abi, address } from "@/constant/constant";
import SkeletonCard from "../common/skeleton";
import { ICharity } from "@/interfaces/interfaces";
import { useMemo } from "react";
import notFound from "../../public/not-found.svg";
import Image from "next/image";

const Charity = () => {
  const { data, isLoading } = useReadContract({
    functionName: "getCharities",
    abi,
    address,
  }) as { data: ICharity[]; isLoading: boolean };

  const sortedData = useMemo(() => {
    if (isLoading) return [];
    return data.sort((a, b) => {
      return Number(b.timestamp) - Number(a.timestamp);
    });
  }, [data, isLoading]);

  return (
    <section>
      {!isLoading && sortedData.length === 0 ? (
        <div className=" flex flex-col justify-center items-center mt-10">
          <Image src={notFound.src} width={250} height={250} alt="not found" />
          <p className="text-center">No charities found</p>
        </div>
      ) : (
        <>
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <div className="  flex items-center flex-wrap gap-4 justify-center">
              {sortedData.map((charity, idx) => (
                <CharityList key={idx} charity={charity} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Charity;
