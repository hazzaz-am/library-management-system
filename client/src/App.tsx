import { Outlet } from "react-router";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Toaster } from "sonner";

export default function App() {
	return (
		<>
			<Navbar />
			<main className="max-w-7xl mx-auto w-full px-4 py-6 md:py-10 lg:px-8">
				<Outlet />
			</main>
			<Toaster position="top-center" />
			<Footer />
		</>
	);
}
