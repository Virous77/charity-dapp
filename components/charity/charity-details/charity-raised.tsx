"use client";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { charity } from "@/utils/utils";
import EthLogo from "@/components/common/eth-logo";

const CharityRaised = () => {
  const [progress] = useState(70);

  return (
    <div className=" mt-5 w-full">
      <Progress value={progress} />
      <div className=" flex items-center justify-between mt-2">
        <p className=" text-xs font-sans  font-bold flex items-center gap-1">
          <EthLogo size="15" />3 raised
        </p>

        <p className=" text-xs font-sans  font-bold flex items-center gap-1">
          <EthLogo size="15" />8 target
        </p>
      </div>
    </div>
  );
};

export default CharityRaised;
