"use client";

import CharityList from "./charity-list";
import { useReadContract } from "wagmi";
import { abi, address } from "@/constant/constant";
import SkeletonCard from "../common/skeleton";
import { ICharity } from "@/interfaces/interfaces";

const Charity = () => {
  const { data, isLoading } = useReadContract({
    functionName: "getCharities",
    abi,
    address,
  }) as { data: ICharity[]; isLoading: boolean };

  return (
    <section>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="  flex items-center flex-wrap gap-4">
          {data.map((charity, idx) => (
            <CharityList key={idx} {...charity} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Charity;
