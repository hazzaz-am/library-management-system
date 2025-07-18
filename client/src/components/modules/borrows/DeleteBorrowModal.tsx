import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toastMessage from "@/utils/toast-message";
import { Trash2 } from "lucide-react";

export function DeleteBorrowModal({ id }: { id: string }) {
  const handleDelete = () => {
    console.log("Borrow record deleted", id);
    toastMessage("success", "Borrow record deleted successfully");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="bg-red-600 hover:bg-red-700 text-white w-full">
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
