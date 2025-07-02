import { Outlet } from "react-router";
import Navbar from "./components/common/Navbar";

export default function App() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
