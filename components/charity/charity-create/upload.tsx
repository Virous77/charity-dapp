import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type TUpload = {
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  image: string | null;
};

const Upload: React.FC<TUpload> = ({ setForm, setImage, image }) => {
  return (
    <div className="flex items-center justify-center w-full">
      {!image ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-background"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG Supported
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                setForm((prev: any) => ({ ...prev, image: e.target.files[0] }));
                setImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
      ) : (
        <div className=" w-full relative">
          <Image
            src={image}
            alt="upload"
            width={300}
            height={200}
            sizes="100vw"
            className="w-full h-64  rounded-lg bg-background"
          />
          <Trash2
            className=" absolute z-2 right-2 bottom-2 text-primary cursor-pointer "
            onClick={() => {
              setForm((prev: any) => ({ ...prev, image: null }));
              setImage(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Upload;
