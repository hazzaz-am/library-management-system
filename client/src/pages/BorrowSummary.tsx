import { BorrowsTable } from "@/components/modules/borrows/BorrowsTable";

export default function BorrowSummary() {
	return (
		<div className="max-w-4xl mx-auto w-full p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-lg shadow space-y-8">
			{/* Page Title */}
			<div className="space-y-1 text-center">
				<h1 className="text-2xl sm:text-3xl font-bold text-primary">
					Borrow Summary
				</h1>
				<p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
					View a summary of all borrowed books, due dates, and borrower
					information below.
				</p>
			</div>

			{/* Table Placeholder */}
			<div className="mt-6">
				{/* Your summary table component will be placed here */}
				<BorrowsTable />
			</div>
		</div>
	);
}
