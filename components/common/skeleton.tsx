import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Card } from "../ui/card";

const SkeletonCard = () => {
  const count = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className=" flex items-center flex-wrap gap-4">
      {count.map((_, i) => (
        <div key={i} className="p-2  w-full md:w-[310px]">
          <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-[244px] md:h-[182px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-[40%]" />
              <Skeleton className="h-3 w-[80%] mt-2" />
              <Skeleton className="h-3 w-[50%]" />
            </div>

            <div className=" flex items-center gap-3 mt-3">
              <Skeleton className="h-7 w-[30%]" />
              <Skeleton className="h-7 w-[45%]" />
            </div>

            <Skeleton className=" h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;

export const SkeletonCharityDetails = () => {
  return (
    <div className="grid custom-grid gap-2">
      <div>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
      <Card className="p-2">
        <Skeleton className="h-10 w-[80%]" />
        <Skeleton className="h-6 w-[30%] mt-3" />
        <div className=" flex  gap-2 mt-4 flex-col">
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[45%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[55%]" />
        </div>
        <div className=" mt-4">
          <Skeleton className="h-5 w-full rounded-lg" />
          <div className=" flex items-center justify-between mt-2">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[30%]" />
          </div>
        </div>

        <div className=" mt-4">
          <Skeleton className="h-8 w-[50%] rounded-lg" />
          <Skeleton className="h-14 w-full rounded-full mt-6" />
        </div>
      </Card>
    </div>
  );
};
