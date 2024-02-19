"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import zod from "zod";
import Upload from "./upload";
import { useToast } from "@/components/ui/use-toast";
import { useWriteContract } from "wagmi";
import pinFileToIPFS from "@/lib/pinata/pinata";
import { address, abi } from "@/constant/constant";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

const imageValidate = zod.object({
  image: zod
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .svg formats are supported."
    ),
});

const schema = zod.object({
  name: zod.string().min(2),
  userName: zod.string().min(2),
  amount: zod.number().gt(0),
  social: zod.string().url(),
  description: zod.string().min(50),
});

export type TForm = zod.infer<typeof schema>;

const initialForm = {
  name: "",
  userName: "",
  amount: "",
  social: "",
  description: "",
  image: null as any,
};

const Create = () => {
  const [form, setForm] = useState(initialForm);
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: id === "amount" ? +value : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = schema.parse(form);
      if (!form.image) throw new Error("Image is required.");
      const image = imageValidate.parse({ image: form.image }) as {
        image: File;
      };

      setIsLoading(true);
      const resImage = await pinFileToIPFS(image.image);
      if (!resImage || !resImage.IpfsHash)
        throw new Error("Image upload failed.");
      const pinImage = `https://gateway.pinata.cloud/ipfs/${resImage.IpfsHash}`;
      const result = await writeContractAsync({
        address,
        abi,
        functionName: "createCharity",
        args: [
          data.name,
          data.userName,
          data.social,
          data.description,
          pinImage,
          data.amount,
        ],
        gas: BigInt(3000000),
      });
      setIsLoading(false);
      if (result) {
        setForm(initialForm);
        toast({
          title: "Charity created successfully.",
        });
      } else {
        throw new Error("Failed to create charity. Try again later.");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error instanceof zod.ZodError) {
        const message = error.errors[0].message;
        const isUrl = message.includes("url");
        toast({
          title: `${error.errors[0].path[0]} ${
            isUrl ? message : message.slice(6)
          }`,
          variant: "destructive",
        });
      } else {
        toast({
          title: error.message || "Something went wrong, Try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center font-mono">
        Create Charity
      </h1>

      <div className=" mt-4 p-4 bg-muted shadow-md rounded-md grid custom-grid-create gap-3 items-start">
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
                Your Name
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
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>

        <div className=" w-full">
          <Upload setForm={setForm} />
        </div>
      </div>
    </section>
  );
};

export default Create;
