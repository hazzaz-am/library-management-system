import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
	reducerPath: "bookApi",
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_SERVER_URL }),
	tagTypes: ["books", "borrows"],
	endpoints: (build) => ({
		getBooks: build.query({
			query: () => "/books",
			providesTags: ["books"],
		}),
		getBookById: build.query({
			query: (id) => `/books/${id}`,
		}),
		addNewBook: build.mutation({
			query: (newBook) => ({
				url: "/books",
				method: "POST",
				body: newBook,
			}),
			invalidatesTags: ["books"],
		}),
		updateBookById: build.mutation({
			query: ({ bookId, ...updatedData }) => ({
				url: `/books/${bookId}`,
				method: "PUT",
				body: updatedData,
			}),
			invalidatesTags: ["books", "borrows"],
		}),
		deleteBookById: build.mutation({
			query: (bookId) => ({
				url: `/books/${bookId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["books", "borrows"],
		}),
		borrowBook: build.mutation({
			query: (data) => ({
				url: "/borrow",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["books", "borrows"],
		}),
		getBorrowedBooks: build.query({
			query: () => `/borrow`,
			providesTags: ["borrows"],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBookByIdQuery,
	useAddNewBookMutation,
	useBorrowBookMutation,
	useGetBorrowedBooksQuery,
	useDeleteBookByIdMutation,
	useUpdateBookByIdMutation
} = bookApi;
