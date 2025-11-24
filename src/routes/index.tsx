import { createFileRoute } from "@tanstack/react-router";

import Matrix from "@/components/matrix";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<>
			<Matrix />
			<div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
				<h1 className="text-3xl italic pointer-events-auto">
					Don't trust, verify.
				</h1>
			</div>
		</>
	);
}
