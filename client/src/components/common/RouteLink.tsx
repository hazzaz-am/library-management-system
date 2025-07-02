import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

export default function RouteLink({
	item,
	className,
	onClick,
}: {
	item: { id: string; path: string; name: string };
	className?: string;
	onClick?: () => void;
}) {
	return (
		<NavLink
			to={item.path}
			className={({ isActive }) =>
				cn(
					"px-3 py-2 rounded-md font-medium transition-colors",
					className,
					isActive
						? "bg-primary text-primary-foreground shadow"
						: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
				)
			}
			end={item.path === "/"}
			onClick={onClick}
		>
			{item.name}
		</NavLink>
	);
}
