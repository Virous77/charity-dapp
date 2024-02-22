"use client";

import { useEffect, useState } from "react";
import zod from "zod";
import Upload from "./upload";
import { useToast } from "@/components/ui/use-toast";
import { useReadContract, useWriteContract } from "wagmi";
import pinFileToIPFS from "@/lib/pinata/pinata";
import { address, abi } from "@/constant/constant";
import { parseEther } from "viem";
import CreateForm from "./create-form";
import { imageValidate, weiToEth } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICharity } from "@/interfaces/interfaces";
import Image from "next/image";
import waitImage from "../../../public/wait.svg";
import { useQueryClient } from "@tanstack/react-query";

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
  amount: 0,
  social: "",
  description: "",
  image: null as any,
};

const Create = () => {
  const [form, setForm] = useState(initialForm);
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const id = searchParams.get("id");
  const edit = searchParams.get("edit");

  const { data, isLoading: loading } = useReadContract({
    functionName: "getCharity",
    abi,
    address,
    args: [Number(id)],
    query: {
      enabled: !!id && edit === "true",
    },
  }) as { data: ICharity; isLoading: boolean };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: id === "amount" ? +value : value,
    });
  };

  const commonError = (error: any) => {
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
  };

  const commonSuccess = (result: string) => {
    const type = edit && edit === "true" ? "updated" : "created";
    setIsLoading(false);
    queryClient.invalidateQueries();
    if (result) {
      setForm(initialForm);
      setImage(null);
      toast({
        title: `Charity ${type} successfully.`,
      });
    } else {
      throw new Error(`Failed to ${type} charity. Try again later.`);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = schema.parse(form);
      if (!image) throw new Error("Image is required.");
      const VImage =
        form.image === "old"
          ? { image: null }
          : (imageValidate.parse({ image: form.image }) as {
              image: File;
            });

      setIsLoading(true);
      let pinImage = null;

      if (VImage.image) {
        const resImage = await pinFileToIPFS(VImage.image);
        if (!resImage || !resImage.IpfsHash)
          throw new Error("Image upload failed.");
        pinImage = `https://gateway.pinata.cloud/ipfs/${resImage.IpfsHash}`;
      }
      const newImage = pinImage || image;
      const result = await writeContractAsync({
        address,
        abi,
        functionName: "updateCharity",
        args: [
          id,
          data.name,
          data.userName,
          data.social,
          data.description,
          newImage,
          parseEther(data.amount.toString()),
        ],
        gas: BigInt(3000000),
      });
      const params = new URLSearchParams(searchParams.toString());
      params.set("edit", "false");
      params.delete("id");
      router.push(pathName + "?" + params.toString());
      commonSuccess(result);
    } catch (error) {
      commonError(error);
    }
  };

  const handleSubmit = async (type: boolean) => {
    try {
      if (edit === "true" && type) {
        handleUpdate();
        return;
      }
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
          parseEther(data.amount.toString()),
        ],
        gas: BigInt(3000000),
      });
      commonSuccess(result);
    } catch (error: any) {
      commonError(error);
    }
  };

  useEffect(() => {
    if (data && edit === "true" && !loading) {
      setForm({
        name: data.name,
        userName: data.userName,
        amount: weiToEth(Number(data.amount)),
        social: data.social,
        description: data.description,
        image: "old",
      });
      setImage(data.image);
    }
  }, [data, edit, loading]);

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-bold text-center font-mono">
        {edit === "true" && edit ? "Update" : "Create"} Charity
      </h1>

      {edit && edit === "true" && loading ? (
        <div className=" flex flex-col items-center justify-center gap-2 mt-10">
          <Image src={waitImage} width={280} height={280} alt="wait" />
          <p className="text-center font-bold mt-2">Loading...</p>
        </div>
      ) : (
        <>
          <div className=" mt-4 p-4 bg-muted shadow-md rounded-md grid custom-grid-create gap-3 items-start">
            <CreateForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isEdit={edit === "true"}
            />

            <div className=" w-full">
              <Upload setForm={setForm} image={image} setImage={setImage} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Create;
