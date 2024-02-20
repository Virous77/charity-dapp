import EthLogo from "@/components/common/eth-logo";
import { CardHeader } from "@/components/ui/card";
import { ICharity } from "@/interfaces/interfaces";
import { addressShortener, dateFormatter, removeSiteHttp, weiToEth } from "@/utils/utils";
import { ExternalLink } from "lucide-react";
import React from "react";

type TCharityMetadata = {
  data: ICharity;
};

const CharityMetadata: React.FC<TCharityMetadata> = ({ data }) => {
  return (
    <CardHeader className=" p-0">
      <h1 className=" text-2xl font-bold font-mono capitalize">{data.name}</h1>

      <p className=" font-sans font-bold mt-2 text-lg flex items-center gap-1">
        <EthLogo />
        {weiToEth(Number(data.amount))} ETH
      </p>

      <div>
        <p className=" text-sm font-sans font-bold mt-2">
          Created by: {data.userName}
        </p>

        <div className=" flex items-center gap-1 mt-1">
          <span className=" text-sm font-sans font-bold">Owner:</span>{" "}
          <a
            href={`https://sepolia.etherscan.io/address/${data.owner}`}
            target="_blank"
            rel="noreferrer"
            className=" text-xs font-sans font-bold text-primary flex items-center gap-1"
          >
            {addressShortener(data.owner, 4)}
            <ExternalLink size={19} />
          </a>
        </div>

        <p className="text-sm font-sans mt-1 font-bold flex items-center gap-1">
          Official Social:{" "}
          <a
            href={data.social}
            target="_blank"
            rel="noreferrer"
            className=" flex items-center gap-1 text-xs font-sans font-bold text-primary"
          >
            {removeSiteHttp(data.social)}
            <ExternalLink size={19} />
          </a>
        </p>

        <p className="text-sm font-sans mt-1 font-bold flex items-center gap-1">
          <span>Opened At:</span>
          <span className=" text-sm font-sans font-normal">
            {dateFormatter(Number(data.timestamp))}
          </span>
        </p>
      </div>
    </CardHeader>
  );
};

export default CharityMetadata;
