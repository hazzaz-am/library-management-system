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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { EditBookForm } from "./EditBookForm";
import { DeleteBookModal } from "./DeleteBookModal";
import { BorrowBookForm } from "../borrows/BorrowBookForm";
import { useGetBooksQuery } from "@/redux/features/book/bookSlice";
import type { BookType } from "@/types";
import TableSkeleton from "@/components/common/TableSkeleton";
import { Link } from "react-router";

export const columns: ColumnDef<BookType>[] = [
	{
		accessorKey: "title",
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
			return <Link to={`/books/${row.original._id}`}>{row.getValue("title")}</Link>;
		},
	},
	{
		accessorKey: "author",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center justify-center space-x-2 w-full"
				>
					Author
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div>{row.getValue("author")}</div>
		),
	},
	{
		accessorKey: "genre",
		header: () => <div className="text-center">Genre</div>,
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("genre")}</div>
		),
	},
	{
		accessorKey: "isbn",
		header: () => <div className="text-center">ISBN</div>,
		cell: ({ row }) => <div className="capitalize">{row.getValue("isbn")}</div>,
	},
	{
		accessorKey: "copies",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center justify-center space-x-2 w-full"
				>
					Copies
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const copies = parseFloat(row.getValue("copies"));
			return <div className="font-medium">{copies}</div>;
		},
	},
	{
		accessorKey: "available",
		header: () => <div className="text-center">Availability</div>,
		cell: ({ row }) => {
			return (
				<>
					{row.getValue("available") ? (
						<Badge
							variant="secondary"
							className="bg-blue-500 text-white dark:bg-blue-600"
						>
							Available
						</Badge>
					) : (
						<Badge variant="destructive">Not Available</Badge>
					)}
				</>
			);
		},
	},
	{
		id: "actions",
		header: () => <div className="text-center">Actions</div>,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="flex flex-col space-y-1.5"
					
					>
						<BorrowBookForm id={row.original._id} />
						<EditBookForm book={row.original} />
						<DeleteBookModal id={row.original._id} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function BooksTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { data: booksData, error, isLoading } = useGetBooksQuery(undefined);
	const books = booksData?.data;

	const table = useReactTable({
		data: books,
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

	if (error || !booksData || !booksData?.data) {
		return (
			<div className="bg-red-500/15 rounded-md p-5 mt-10 dark:text-white text-black">
				Error loading books
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Show Fields <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
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
