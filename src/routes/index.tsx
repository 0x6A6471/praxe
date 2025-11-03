import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<div>
			<p className="text-candle">hi</p>
		</div>
	);
}
