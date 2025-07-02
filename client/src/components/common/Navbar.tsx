import { useState } from "react";
import { Link } from "react-router";
import { navItems } from "@/data/nav-items";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import RouteLink from "./RouteLink";
import HamburgerIcon from "@/svg-icons/HamburgerIcon";

export default function Navbar() {
	const [open, setOpen] = useState(false);
  
	const renderNavItems = navItems.map((item) => (
		<RouteLink
			key={item.id}
			item={item}
			onClick={() => {
				if (open) {
					setOpen(false);
				}
			}}
			className={open ? "block text-base" : "text-sm"}
		/>
	));

	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<Link
						to="/"
						className="flex-shrink-0 flex items-center text-xl font-bold text-primary"
					>
						Library
					</Link>
					<div className="flex items-center space-x-4">
						<div className="hidden md:flex md:items-center md:space-x-6">
							{renderNavItems}
						</div>
						<div className="flex md:hidden">
							<button
								onClick={() => setOpen((v) => !v)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
								aria-controls="mobile-menu"
								aria-expanded={open}
							>
								<span className="sr-only">Open main menu</span>
								<HamburgerIcon open={open} />
							</button>
						</div>
						<ModeToggle />
					</div>
				</div>
			</div>
			{/* Mobile menu */}
			<div
				className={cn(
					"md:hidden transition-all duration-200",
					open ? "block" : "hidden"
				)}
				id="mobile-menu"
			>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{renderNavItems}</div>
			</div>
		</nav>
	);
}
