import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { useToast } from "../ui/use-toast";
import { address, abi } from "@/constant/constant";

const DeleteCharity = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const { writeContractAsync, isPending } = useWriteContract();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      const result = await writeContractAsync({
        address,
        abi,
        functionName: "deleteCharity",
        args: [id],
        gas: BigInt(3000000),
      });

      if (result) {
        setOpen(false);
        toast({
          title: "Charity deleted successfully",
        });
      } else {
        throw new Error("Failed to delete Charity");
      }
    } catch (error: any) {
      if (error.message.includes("User denied transaction signature")) {
        return;
      }
      toast({
        title: error.message || "Failed to delete Charity",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className=" p-0 m-0">
        <div className=" flex items-center gap-2 cursor-pointer pl-3 hover:bg-accent py-2">
          <Trash2 size={20} />
          <span>Delete Charity</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Charity and remove from our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className=" bg-red-600 hover:bg-red-500"
            onClick={() => handleDelete(id)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCharity;
