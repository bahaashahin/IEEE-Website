import { Link } from "react-router-dom";
import { ShieldCheck, MessageSquare, LogOut, Users, X } from "lucide-react";

export interface SideBarContentProps {
	sideBarOnclick: () => void;
	handleLogOut: () => void;
	// isMobileMenuOpen: boolean;
	// setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContent = ({
	sideBarOnclick,
	handleLogOut,
	// isMobileMenuOpen,
	// setIsMobileMenuOpen,
}: SideBarContentProps) => (
	<div className="flex flex-col h-full justify-between">
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="bg-blue-600 p-2 rounded-lg">
						<ShieldCheck className="text-white" size={20} />
					</div>
					<div>
						<h2 className="font-bold text-sm leading-tight text-white">
							IEEE Al-Azhar
						</h2>
						<span className="text-xs text-blue-400">Admin Panel</span>
					</div>
				</div>
				<button
					className="md:hidden text-slate-400 hover:text-white"
					onClick={sideBarOnclick}
				>
					<X size={20} />
				</button>
			</div>

			<nav className="space-y-2">
				<Link
					to="/dashboard"
					onClick={sideBarOnclick}
					className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl text-sm transition border ${
						location.pathname === "/dashboard" ||
						location.pathname === "/dashboard/"
							? "bg-blue-600/10 text-blue-400 border-blue-500/20"
							: "text-slate-400 hover:bg-slate-800/50 border-transparent"
					}`}
				>
					<Users size={18} /> Board Members
				</Link>
				<Link
					to="/dashboard/feedback"
					onClick={sideBarOnclick}
					className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl text-sm transition border ${
						location.pathname === "/dashboard/feedback"
							? "bg-blue-600/10 text-blue-400 border-blue-500/20"
							: "text-slate-400 hover:bg-slate-800/50 border-transparent"
					}`}
				>
					<MessageSquare size={18} /> Feedback
				</Link>
			</nav>
		</div>

		<button
			onClick={handleLogOut}
			className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition w-full mt-auto"
		>
			<LogOut size={18} /> Logout
		</button>
	</div>
);

export default SidebarContent;
