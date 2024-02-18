"use client";

import { charity } from "@/utils/utils";
import CharityList from "./charity-list";
import { useReadContract } from "wagmi";
import { abi, address } from "@/constant/constant";
import SkeletonCard from "../common/skeleton";

const Charity = () => {
  const { data, isLoading } = useReadContract({
    functionName: "getCharities",
    abi,
    address,
  });

  return (
    <section>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="  flex items-center flex-wrap gap-4">
          {charity.map((charity, idx) => (
            <CharityList key={idx} {...charity} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Charity;
