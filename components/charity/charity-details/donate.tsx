"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import zod from "zod";
import { useToast } from "@/components/ui/use-toast";

const Donate = () => {
  const schema = zod.object({
    name: zod.string(),
    say: zod.string(),
    amount: zod.number().gt(0),
  });

  const [formData, setFomData] = useState({
    name: "",
    say: "",
    amount: 0.03,
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFomData({ ...formData, [name]: name === "amount" ? +value : value });
  };

  const handleSubmit = () => {
    try {
      const data = schema.parse(formData);
      console.log(data);
    } catch (error) {
      if (error instanceof zod.ZodError) {
        toast({
          title: "Amount must be greater than 0",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog>
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
            Donate
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
