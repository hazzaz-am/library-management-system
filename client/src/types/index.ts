export type Theme = "dark" | "light" | "system";

export type BookType = {
	_id: string;
	title: string;
	author: string;
	isbn: string;
	genre:
		| "FICTION"
		| "NON_FICTION"
		| "SCIENCE"
		| "FANTASY"
		| "HISTORY"
		| "BIOGRAPHY";
	description: string;
	copies: number;
	available: boolean;
	createdAt: string;
	updatedAt: string;
};
