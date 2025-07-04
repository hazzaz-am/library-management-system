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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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

type BookType = {
	title: string;
	isbn: string;
};

type Borrow = {
	totalQuantity: number;
	book: BookType;
};

const data: Borrow[] = [
	{
		totalQuantity: 5,
		book: {
			title: "The Theory of SQL",
			isbn: "9780553380189",
		},
	},
	{
		totalQuantity: 3,
		book: {
			title: "Introduction to Algorithms",
			isbn: "9780262033848",
		},
	},
	{
		totalQuantity: 2,
		book: {
			title: "Design Patterns",
			isbn: "9780201633610",
		},
	},
	{
		totalQuantity: 4,
		book: {
			title: "Clean Code",
			isbn: "9780132350884",
		},
	},
	{
		totalQuantity: 1,
		book: {
			title: "The Pragmatic Programmer",
			isbn: "9780135957059",
		},
	},
];

export const columns: ColumnDef<Borrow>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			console.log(column);
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
		cell: ({ row }) => <div className="lowercase text-center">{row.original.book.title}</div>,
	},
	{
		accessorKey: "isbn",
		header: () => <div className="text-center">ISBN</div>,
		cell: ({ row }) => <div className="capitalize text-center">{row.original.book.isbn}</div>,
	},
  {
    accessorKey: "totalQuantity",
    header: () => <div className="text-center">Total Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="secondary">{row.original.totalQuantity}</Badge>
      </div>
    ),
  },
	{
		id: "actions",
		header: () => <div className="text-center">Actions</div>,
		cell: () => {
			return (
				<DropdownMenu >
					<DropdownMenuTrigger asChild>
						<Button variant="link" className="h-8 w-full p-0 mx-auto">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Delete Book</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function BorrowsTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
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

  console.log(table.getColumn("title"));

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
