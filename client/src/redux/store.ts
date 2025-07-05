import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./features/book/bookSlice";

export const store = configureStore({
	reducer: {
		[bookApi.reducerPath]: bookApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootGetState = ReturnType<typeof store.getState>;
export type RootAppDispatch = typeof store.dispatch;
