"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import zod from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useWriteContract } from "wagmi";
import { abi, address } from "@/constant/constant";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

const schema = zod.object({
  name: zod.string(),
  say: zod.string(),
  amount: zod.number().gt(0),
});

const initialState = {
  name: "",
  say: "",
  amount: "",
};

const Donate = ({ id }: { id: number }) => {
  const [formData, setFomData] = useState(initialState);
  const { writeContractAsync, isPending } = useWriteContract();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { address } = useAccount();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFomData({ ...formData, [name]: name === "amount" ? +value : value });
  };

  const handleSubmit = async () => {
    try {
      if (!address) {
        toast({
          title: "Connect wallet to donate",
          variant: "destructive",
        });
        return;
      }

      const data = schema.parse(formData);
      await writeContractAsync({
        address,
        abi,
        functionName: "donate",
        args: [id, data.name || "_", data.say || "_"],
        gas: BigInt(3000000),
        value: parseEther(data.amount.toString()),
      });
      setOpen(false);
      setFomData(initialState);
      toast({
        title: "Donation successful",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof zod.ZodError) {
        toast({
          title: "Amount must be greater than 0",
          variant: "destructive",
        });
      } else {
        toast({
          title: "An error occurred",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className=" w-full !h-[50px] !rounded-[30px]">Donate</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className=" text-xl font-mono font-bold pl-4">Donate</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" p-4 flex flex-col gap-4"
        >
          <fieldset className=" flex flex-col gap-2">
            <Label htmlFor="name">Name*</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={formData.name}
            />
          </fieldset>

          <fieldset className=" flex flex-col gap-2">
            <Label htmlFor="say">Say*</Label>
            <Input
              type="text"
              name="say"
              id="say"
              onChange={handleChange}
              value={formData.say}
            />
          </fieldset>

          <fieldset className=" flex flex-col gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              onChange={handleChange}
              value={formData.amount}
            />
          </fieldset>

          <Button type="submit" onClick={handleSubmit} className=" !h-[50px]">
            {isPending ? "Loading..." : "Donate"}
          </Button>
        </form>

        <DialogFooter>
          <span className=" p-2 py-3 bg-muted inline-block w-full rounded-bl-[5px] rounded-br-[5px] hover:bg-popover">
            Close
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Donate;
