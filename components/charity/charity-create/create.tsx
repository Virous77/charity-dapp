"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import zod from "zod";
const Create = () => {
  const schema = zod.object({
    name: zod.string().min(2),
    userName: zod.string().min(2),
    amount: zod.number().gt(0),
    social: zod.string().url(),
    description: zod.string().min(50),
  });

  const [form, setForm] = useState({
    name: "",
    userName: "",
    amount: 0,
    social: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: id === "amount" ? +value : value,
    });
  };

  const handleSubmit = () => {
    try {
      const data = schema.parse(form);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center font-mono">
        Create Charity
      </h1>

      <div className=" mt-4 p-4 bg-muted shadow-md rounded-md">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-full flex flex-col gap-5 "
        >
          <div className=" flex items-center justify-between gap-4 w-full">
            <fieldset className=" w-full flex flex-col gap-2">
              <Label htmlFor="name" className=" font-bold">
                Charity Name
              </Label>
              <Input
                type="text"
                id="name"
                className="w-full"
                onChange={handleChange}
                value={form.name}
              />
            </fieldset>

            <fieldset className=" w-full flex flex-col gap-2">
              <Label htmlFor="userName" className=" font-bold">
                User Name
              </Label>
              <Input
                type="text"
                id="userName"
                className="w-full"
                onChange={handleChange}
                value={form.userName}
              />
            </fieldset>
          </div>

          <div className=" flex items-center justify-between gap-4 w-full">
            <fieldset className="flex flex-col gap-2 w-[40%]">
              <Label htmlFor="amount" className=" font-bold">
                Amount in ETH
              </Label>
              <Input
                type="number"
                id="amount"
                className="w-full"
                onChange={handleChange}
                value={form.amount}
              />
            </fieldset>

            <fieldset className=" w-full flex flex-col gap-2">
              <Label htmlFor="social" className=" font-bold">
                Social URL
              </Label>
              <Input
                type="text"
                id="social"
                className="w-full"
                onChange={handleChange}
                value={form.social}
              />
            </fieldset>
          </div>

          <fieldset className="w-full flex flex-col gap-2">
            <Label htmlFor="description" className=" font-bold">
              Description
            </Label>
            <Textarea
              className=" max-h-[100px]"
              id="description"
              onChange={handleChange}
              value={form.description}
            />
          </fieldset>

          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Create
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Create;
