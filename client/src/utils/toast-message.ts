import { toast } from "sonner";

export default function toastMessage(
	type: "success" | "error",
	message: string
) {
	const style = {
		success: "bg-green-500! text-white! border-green-500!",
		error: "bg-red-500! text-white! border-red-500!",
	};
	return toast[type](message, {
		className: style[type],
	});
}
