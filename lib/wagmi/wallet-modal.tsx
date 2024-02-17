"use client";

import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { addressShortener } from "@/utils/utils";
import React from "react";
import Logo from "@/components/layout/logo";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <React.Fragment>
      {address ? (
        <Button
          onClick={() => open()}
          className=" flex items-center"
          style={{ gap: "0.5rem", borderRadius: "30px" }}
        >
          <Logo />
          <span>{addressShortener(address, 4)}</span>
        </Button>
      ) : (
        <Button onClick={() => open()} style={{ borderRadius: "30px" }}>
          Connect Wallet
        </Button>
      )}
    </React.Fragment>
  );
}
