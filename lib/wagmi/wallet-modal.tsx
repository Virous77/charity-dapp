"use client";

import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import Logo from "@/components/layout/logo";
import { addressShortener } from "@/utils/utils";
import React from "react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <React.Fragment>
      {address ? (
        <Button
          onClick={() => open()}
          className=" flex items-center rounded-[20px]"
          style={{ gap: "0.5rem" }}
        >
          <Logo />
          <span>{addressShortener(address, 4)}</span>
        </Button>
      ) : (
        <Button className=" rounded-[20px]" onClick={() => open()}>
          Connect Wallet
        </Button>
      )}
    </React.Fragment>
  );
}
