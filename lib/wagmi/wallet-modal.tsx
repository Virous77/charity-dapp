"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "lucide-react";
import { Connector, useConnect } from "wagmi";

const WalletModal = () => {
  const { connectors, connect } = useConnect();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=" flex items-center gap-4 justify-center">
            <Wallet />
            Choose Wallet and Connect
          </DialogTitle>
        </DialogHeader>
        <ul style={{ paddingTop: "20px", paddingBottom: "40px" }}>
          {connectors.slice(1).map((connector: Connector, idx) => (
            <>
              <Separator color="red" />
              <li
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full p-4 text-center hover:text-background"
                style={{ cursor: "pointer" }}
              >
                {connector.name}
              </li>
            </>
          ))}
          <Separator />
        </ul>

        <DialogFooter className=" w-full">
          <Button
            type="submit"
            variant="ghost"
            className=" w-full"
            style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
