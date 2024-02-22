import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { TForm } from "./create";

type TCreateForm = {
  form: TForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: boolean) => void;
  isLoading: boolean;
  isEdit: boolean;
};

const CreateForm: React.FC<TCreateForm> = ({
  form,
  handleChange,
  handleSubmit,
  isLoading,
  isEdit,
}) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" w-full flex flex-col gap-5 "
    >
      <div className=" flex items-center justify-between gap-4 w-full flex-col md:flex-row mt-3 md:mt-0">
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

      <div className=" flex md:items-center justify-between gap-4 w-full flex-col md:flex-row ">
        <fieldset className="flex flex-col gap-2 w-[60%] md:w-[40%]">
          <Label htmlFor="amount" className=" font-bold">
            Amount in ETH
          </Label>
          <Input
            type="number"
            id="amount"
            className="w-full"
            onChange={handleChange}
            value={form.amount === 0 ? "" : form.amount}
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
          className="max-h-[150px] md:max-h-[100px]"
          id="description"
          onChange={handleChange}
          value={form.description}
        />
      </fieldset>

      {isEdit ? (
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleSubmit(true)}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleSubmit(false)}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      )}
    </form>
  );
};

export default CreateForm;
