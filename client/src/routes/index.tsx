import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Books />,
			},
			{
				path: "/books",
				element: <Books />,
			},
			{
				path: "/books/:bookId",
				element: <BookDetails />,
			},
			{
				path: "/create-book",
				element: <CreateBook />,
			},
			{
				path: "/borrow-summary",
				element: <BorrowSummary />,
			},
		],
	},
]);
