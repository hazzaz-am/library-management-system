import { BooksTable } from "@/components/modules/books/BooksTable";

export default function Books() {
	return (
		<div className="space-y-8">
			<div className="mt-6">
				<h2 className="text-lg font-semibold">Books List</h2>
				<div className="text-center text-gray-400">
					<BooksTable />
				</div>
			</div>
		</div>
	);
}
