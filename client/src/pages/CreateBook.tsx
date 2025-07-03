import AddBookForm from "@/components/modules/books/AddBookForm";

export default function CreateBook() {
	return (
		<div className="max-w-2xl mx-auto w-full p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-lg shadow space-y-8">
			{/* Page Title */}
			<div className="space-y-1 text-center">
				<h1 className="text-2xl sm:text-3xl font-bold text-primary">
					Add a New Book
				</h1>
				<p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
					Fill in the details below to add a new book to the library. Please
					ensure all information is accurate.
				</p>
			</div>

			{/* Additional Information */}
			<div className="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm text-gray-600 dark:text-gray-300">
				<ul className="list-disc pl-5 space-y-1">
					<li>
						All fields marked with <span className="text-red-500">*</span> are
						required.
					</li>
					<li>ISBN number will be unique for each book.</li>
					<li>Genres help users find books more easily.</li>
				</ul>
			</div>

			{/* Book Form Placeholder */}
			<div className="mt-6">
				{/* Place your Add Book form component here */}
				<div className="text-gray-400">
					<AddBookForm />
				</div>
			</div>
		</div>
	);
}
