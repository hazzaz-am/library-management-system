import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { CalendarIcon, DollarSign } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/features/book/bookSlice";
import toastMessage from "@/utils/toast-message";

export function BorrowBookForm({ id }: { id: string }) {
	const navigate = useNavigate();
	const [borrowBook] = useBorrowBookMutation();
	const form = useForm({
		defaultValues: {
			quantity: "",
			dueDate: undefined,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const bookData = {
			...data,
			book: id,
			quantity: parseInt(data.quantity),
		};
		borrowBook(bookData);
		toastMessage("success", "Book borrowed successfully");
		form.reset();
		navigate("/borrow-summary");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<DollarSign /> Borrow Book
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Borrow Book</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Quantity <span className="text-destructive">*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter number of quantity"
											{...field}
											{...form.register("quantity", {
												required: "Number of quantity is required",
												min: {
													message:
														"Quantity must be a positive number and greater than 0",
													value: 1,
												},
												pattern: {
													message: "Must be a valid number",
													value: /^\d+$/,
												},
											})}
										/>
									</FormControl>
									<FormMessage>
										{form.formState.errors.quantity?.message}
									</FormMessage>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							rules={{ required: "Please select a due date" }}
							name="dueDate"
							render={({ field }) => {
								const hasError = form.formState.errors.dueDate;
								return (
									<FormItem className="flex flex-col">
										<FormLabel className={hasError ? "text-destructive" : ""}>
											Due Date <span className="text-destructive">*</span>
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl
													className={cn(
														"border",
														hasError && "border-destructive!"
													)}
												>
													<Button
														variant={"outline"}
														className={cn(
															"pl-3 text-left font-normal border",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage>{hasError?.message}</FormMessage>
									</FormItem>
								);
							}}
						/>
						<Button type="submit">Borrow</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
