import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-8">
			<div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-center text-sm text-gray-500 dark:text-gray-400">
				<div>
					&copy; {new Date().getFullYear()} Library Management System. All
					rights reserved.
				</div>
				<div className="mt-2 md:mt-0">
					Built by{" "}
					<Link
						to="https://github.com/hazzaz-am"
						className="text-primary hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Hazzaz Abdul Mannan
					</Link>
				</div>
			</div>
		</footer>
	);
}
