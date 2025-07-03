import { Button } from "@/components/ui/button";
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
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export default function AddBookForm() {
	const form = useForm({
		defaultValues: {
			title: "",
			author: "",
			genre: "",
			copies: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const isbn = `ISBN-${Math.random().toString(36).substring(2, 15)}`;

		const bookData = {
			...data,
			isbn,
		};
		console.log("Book Data Submitted:", bookData);
		form.reset();
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
									})}
								/>
							</FormControl>
							<FormMessage>{form.formState.errors.author?.message}</FormMessage>
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
				<Button type="submit">Add Book</Button>
			</form>
		</Form>
	);
}
