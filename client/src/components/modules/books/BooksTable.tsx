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
	DropdownMenuItem,
	DropdownMenuSeparator,
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

const data: Book[] = [
	{
		id: "m5gr84i9",
		copies: 316,
		genre: "FICTION",
		title: "ken99@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "3u1reuv4",
		copies: 242,
		genre: "NON_FICTION",
		title: "Abe45@example.com",
		author: "Aurelio",
		isbn: "978-1-56619-909-4",
		availability: true,
	},
	{
		id: "derv1ws0",
		copies: 837,
		genre: "SCIENCE",
		title: "Monserrat44@example.com",
		author: "Aurelio",
		isbn: "978-0-12-345678-9",
		availability: true,
	},
	{
		id: "5kma53ae",
		copies: 874,
		genre: "FANTASY",
		title: "Silas22@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "HISTORY",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "HISTORY",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "BIOGRAPHY",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: false,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "FICTION",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: false,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "NON_FICTION",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "SCIENCE",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: false,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "SCIENCE",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "SCIENCE",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "SCIENCE",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: false,
	},
	{
		id: "bhqecj4p",
		copies: 721,
		genre: "SCIENCE",
		title: "carmella@example.com",
		author: "Aurelio",
		isbn: "978-3-16-148410-0",
		availability: true,
	},
];

export type Book = {
	id: string;
	copies: number;
	genre:
		| "FICTION"
		| "NON_FICTION"
		| "SCIENCE"
		| "FANTASY"
		| "HISTORY"
		| "BIOGRAPHY";
	title: string;
	author: string;
	isbn: string;
	availability: boolean;
};

export const columns: ColumnDef<Book>[] = [
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
		cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
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
			<div className="lowercase">{row.getValue("author")}</div>
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
		accessorKey: "availability",
		header: () => <div className="text-center">Availability</div>,
		cell: ({ row }) => {
			return (
				<>
					{row.getValue("availability") ? (
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
			const book = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(book.id)}
						>
							Copy Book Id
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Borrow Book</DropdownMenuItem>
						<DropdownMenuItem>Edit Book</DropdownMenuItem>
						<DropdownMenuItem>Delete Book</DropdownMenuItem>
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
