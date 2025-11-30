import Icon from "../core/icon";

export default function Footer() {
	return (
		<footer className="py-4 mt-auto flex items-center justify-between text-sm text-muted-foreground/50 ">
			<a
				href="https://0x6a6471.com"
				target="_blank"
				rel="noopener noreferrer"
				className="group relative inline-flex items-center"
			>
				<span className="relative z-10 transition-all duration-300">
					Crafted by
				</span>
				<img
					src="images/0x6A6471.svg"
					alt="0x6A6471"
					className="inline-block h-6 w-auto rounded-full relative z-10 transition-all duration-300"
				/>
				<span className="absolute top-1/2 left-[calc(50%-2px)] -translate-x-1/2 -translate-y-1/2 h-5 w-16 bg-accent opacity-0 group-focus:opacity-80 group-hover:opacity-80 blur-md transition-opacity duration-300 rounded-full" />
			</a>
			<a
				href="https://github.com/0x6A6471/praxe"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block relative text-[#6cc644] opacity-75 transition-all duration-300 group"
			>
				<Icon
					name="github"
					variant="filled"
					size="24"
					className="relative z-10 group-hover:opacity-90"
				/>
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-[#6cc644] opacity-0 group-focus:opacity-80 group-hover:opacity-80 blur-lg transition-opacity duration-300 rounded-full" />
			</a>
		</footer>
	);
}
