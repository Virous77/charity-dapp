"use client";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { weiToEth } from "@/utils/utils";
import EthLogo from "@/components/common/eth-logo";

const CharityRaised = ({
  amount,
  raised,
}: {
  amount: string;
  raised: string;
}) => {
  const [progress] = useState((weiToEth(+raised) / Number(amount)) * 100);

  return (
    <div className=" mt-5 w-full">
      <Progress value={progress} />
      <div className=" flex items-center justify-between mt-2">
        <p className=" text-xs font-sans  font-bold flex items-center gap-1">
          <EthLogo size="15" />
          {weiToEth(+raised)} raised
        </p>

        <p className=" text-xs font-sans  font-bold flex items-center gap-1">
          <EthLogo size="15" />
          {weiToEth(+amount)} target
        </p>
      </div>
    </div>
  );
};

export default CharityRaised;
