import { FilePenLine, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { Separator } from "../ui/separator";
import DeleteCharity from "./delete-charity";

const CharityPopover = ({ id }: { id: number }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-primary w-[30px] h-[30px] rounded-full absolute top-1 right-2 flex items-center justify-center cursor-pointer hover:bg-accent">
          <MoreHorizontal size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-[170px]">
        <div className=" cursor-pointer pl-3 hover:bg-accent py-2">
          <Link
            href={`/create?edit=true&id=${id}`}
            className=" flex items-center gap-2"
          >
            <FilePenLine size={20} /> <span>Edit Charity</span>
          </Link>
        </div>
        <Separator />

        <DeleteCharity id={id} />
      </PopoverContent>
    </Popover>
  );
};

export default CharityPopover;
