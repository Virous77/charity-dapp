import { ICharitySupport } from "@/interfaces/interfaces";
import { addressShortener, weiToEth } from "@/utils/utils";
import { HandCoins } from "lucide-react";
import React from "react";

const SupportList = ({ amount, userName, supporter }: ICharitySupport) => {
  return (
    <li className=" flex items-center gap-2 mt-2">
      <span className="w-[35px] h-[35px] rounded-full bg-muted flex items-center justify-center">
        <HandCoins />
      </span>

      <div className=" flex flex-col">
        <b className=" text-sm  mt-1 capitalize">
          {userName ? userName : addressShortener(supporter, 4)}
        </b>
        <span className="text-sm">{weiToEth(Number(amount))} ETH</span>
      </div>
    </li>
  );
};

export default SupportList;
