import { useGetBookByIdQuery } from "@/redux/features/book/bookSlice";
import { useParams } from "react-router";

export default function BookDetails() {
	const { bookId } = useParams();
	const { data, error, isLoading } = useGetBookByIdQuery(bookId);

	if (isLoading) {
		return <div className="text-center py-10 text-gray-500">Loading...</div>;
	}
	if (error || !data || !data.data) {
		return (
			<div className="text-center py-10 text-red-500">Book not found.</div>
		);
	}

	const { data: book } = data;
	const { title, author, genre, isbn, copies, available, description } = book;

	return (
		<div className="max-w-2xl mx-auto w-full p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-lg shadow space-y-8">
			{/* Book Title */}
			<div className="space-y-1 text-center">
				<h1 className="text-2xl sm:text-3xl font-bold text-primary">{title}</h1>
				<p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
					by {author}
				</p>
			</div>

			{/* Book Details */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div>
					<div className="mb-2">
						<span className="font-semibold text-gray-700 dark:text-gray-200">
							Genre:
						</span>{" "}
						{genre}
					</div>
					<div className="mb-2">
						<span className="font-semibold text-gray-700 dark:text-gray-200">
							ISBN:
						</span>{" "}
						{isbn}
					</div>
					<div className="mb-2">
						<span className="font-semibold text-gray-700 dark:text-gray-200">
							Copies:
						</span>{" "}
						{copies}
					</div>
					<div className="mb-2">
						<span className="font-semibold text-gray-700 dark:text-gray-200">
							Available:
						</span>{" "}
						{available ? (
							<span className="text-green-600 font-semibold">Yes</span>
						) : (
							<span className="text-red-500 font-semibold">No</span>
						)}
					</div>
				</div>
				<div className="sm:col-span-1">
					<div className="bg-gray-50 dark:bg-gray-800 rounded p-4 h-full flex items-center">
						<p className="text-gray-600 dark:text-gray-300 text-sm">
							{description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
