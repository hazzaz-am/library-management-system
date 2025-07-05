/* eslint-disable react-refresh/only-export-components */
"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useGetBorrowedBooksQuery } from "@/redux/features/book/bookSlice";
import TableSkeleton from "@/components/common/TableSkeleton";

type BookType = {
	title: string;
	isbn: string;
};

type Borrow = {
	totalQuantity: number;
	book: BookType;
};

export const columns: ColumnDef<Borrow>[] = [
	{
		accessorFn: (row) => row.book.title,
		id: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center justify-center space-x-2 w-full"
				>
					Title
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className="text-center">{row.original.book.title}</div>
			);
		},
	},
	{
		accessorKey: "isbn",
		header: () => <div className="text-center">ISBN</div>,
		cell: ({ row }) => (
			<div className="capitalize text-center">{row.original.book.isbn}</div>
		),
	},
	{
		accessorKey: "totalQuantity",
		header: () => <div className="text-center">Total Quantity</div>,
		cell: ({ row }) => (
			<div className="text-center">
				<Badge variant="secondary">{row.original.totalQuantity}</Badge>
			</div>
		),
	}
];

export function BorrowsTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const {data: borrowsData, isLoading, error} = useGetBorrowedBooksQuery(undefined)
	const borrowedBooks = borrowsData?.data;

	const table = useReactTable({
		data: borrowedBooks,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

		if (isLoading) {
			return <TableSkeleton />;
		}
	
		if (error || !borrowsData || !borrowsData?.data) {
			return (
				<div className="bg-red-500/15 rounded-md p-5 mt-10 dark:text-white text-black">
					Error loading borrowed books
				</div>
			);
		}
	

	return (
		<div className="w-full">
			<div className="flex items-center justify-between flex-wrap gap-2 py-4">
				<Input
					placeholder="Filter Titles..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
