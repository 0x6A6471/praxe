import { Link, useLocation } from "@tanstack/react-router";

import cn from "@/utils/class-names";
import NetworkSwitch from "./network-switch";

const links = [
	{ name: "PSBT", to: "/psbt" },
	{ name: "Transaction", to: "/transaction" },
];

export default function Nav() {
	const { href } = useLocation();

	return (
		<nav className="flex items-center justify-between py-4">
			<Link to="/">
				<img
					src="praxe.svg"
					alt="praxe logo"
					className="pointer-events-none select-none size-6"
				/>
			</Link>
			<div className="flex items-center gap-x-4 sm:gap-x-8">
				{links.map((link) => (
					<div key={link.name} className="relative">
						<Link
							to={link.to}
							className={cn(
								href === link.to
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{link.name}
						</Link>
						{href === link.to && (
							<div className="absolute h-1.5 w-1.5 rounded-full bg-primary -bottom-2.5 left-1/2 transform -translate-x-1/2" />
						)}
					</div>
				))}
				<NetworkSwitch />
			</div>
		</nav>
	);
}
