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
import { useDeleteBookByIdMutation } from "@/redux/features/book/bookSlice";
import toastMessage from "@/utils/toast-message";
import { Trash2 } from "lucide-react";

export function DeleteBookModal({ id }: { id: string }) {
	const [deleteBook] = useDeleteBookByIdMutation();

	const handleDelete = async () => {
		try {
			await deleteBook(id).unwrap();
			toastMessage("success", "Book deleted successfully");
		} catch (error) {
			if (error instanceof Error) {
				toastMessage("error", `Error: ${error.message}`);
			} else {
				toastMessage("error", "Failed to delete book");
			}
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="secondary"
					className="bg-red-600 hover:bg-red-700 text-white"
				>
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
