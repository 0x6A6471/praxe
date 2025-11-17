import { Link, useLocation } from "@tanstack/react-router";

import cn from "@/utils/class-names";
import NetworkSwitch from "./network-switch";

export default function Nav() {
	const { href } = useLocation();
	const active = href === "/psbt";

	return (
		<nav className="flex items-center justify-between py-2">
			<Link to="/">
				<img
					src="praxe.svg"
					alt="praxe logo"
					className="pointer-events-none select-none size-6"
				/>
			</Link>
			<div className="flex items-center gap-x-4 sm:gap-x-8">
				<div className="relative">
					<Link
						to="/psbt"
						className={cn(
							active
								? "text-foreground"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						PSBT
					</Link>
					{active && (
						<div className="absolute h-1 w-1 rounded-full bg-mint -bottom-2 left-1/2 transform -translate-x-1/2" />
					)}
				</div>
				<NetworkSwitch />
			</div>
		</nav>
	);
}
