import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddNewBookMutation } from "@/redux/features/book/bookSlice";
import toastMessage from "@/utils/toast-message";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

export default function AddBookForm() {
	const navigate = useNavigate();
	const [addNewBook] = useAddNewBookMutation();
	const form = useForm({
		defaultValues: {
			title: "",
			author: "",
			description: "",
			isbn: "",
			genre: "",
			copies: "",
			available: true,
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const bookData = {
			...data,
			copies: parseInt(data.copies),
		};

		try {
			await addNewBook(bookData).unwrap();
			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				toastMessage("error", `Error: ${error.message}`);
			} else {
				toastMessage("error", "Failed to add book");
			}
		} finally {
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Title <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter book title"
									{...field}
									{...form.register("title", {
										required: "Title is required",
									})}
								/>
							</FormControl>
							<FormMessage>{form.formState.errors.title?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="author"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Author <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter book author"
									{...field}
									{...form.register("author", {
										required: "Author is required",
										minLength: {
											message: "Author must be at least 2 characters",
											value: 2,
										},
										pattern: {
											message: "Author must be a valid name",
											value: /^[a-zA-Z\s]+$/,
										},
									})}
								/>
							</FormControl>
							<FormMessage>{form.formState.errors.author?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Description <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about the book"
									className="resize-none"
									{...field}
									{...form.register("description", {
										required: "Description is required",
									})}
								/>
							</FormControl>
							<FormMessage>
								{form.formState.errors.description?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isbn"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								ISBN <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter ISBN"
									{...field}
									{...form.register("isbn", {
										required: "ISBN is required",
									})}
								/>
							</FormControl>
							<FormMessage>{form.formState.errors.isbn?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="genre"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Genre <span className="text-destructive">*</span>
							</FormLabel>
							<Select
								onValueChange={field.onChange}
								{...field}
								{...form.register("genre", {
									required: "Select one genre",
								})}
							>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Select Genre" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="FICTION">Fiction</SelectItem>
									<SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
									<SelectItem value="SCIENCE">Science</SelectItem>
									<SelectItem value="HISTORY">History</SelectItem>
									<SelectItem value="BIOGRAPHY">Biography</SelectItem>
									<SelectItem value="FANTASY">Fantasy</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage>{form.formState.errors.genre?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="copies"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Copies <span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter number of copies"
									{...field}
									{...form.register("copies", {
										required: "Number of copies is required",
										min: {
											message:
												"Copies must be a positive number and greater than 0",
											value: 1,
										},
										pattern: {
											message: "Must be a valid number",
											value: /^\d+$/,
										},
									})}
								/>
							</FormControl>
							<FormMessage>{form.formState.errors.copies?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="available"
					render={({ field }) => (
						<FormItem className="flex flex-row-reverse items-center">
							<FormLabel>Book Available</FormLabel>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage>
								{form.formState.errors.available?.message}
							</FormMessage>
						</FormItem>
					)}
				/>

				<Button type="submit">Add Book</Button>
			</form>
		</Form>
	);
}
