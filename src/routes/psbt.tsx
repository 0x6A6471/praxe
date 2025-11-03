import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/psbt")({ component: PsbtPage });

function PsbtPage() {
	return (
		<div className="space-y-16 w-full">
			<form>
				<div>
					<label htmlFor="hex" className="text-gray-100">
						Hex or base64
					</label>
					<div>
						<textarea
							id="hex"
							name="hex"
							autoFocus
							spellCheck={false}
							className="mt-1 outline-0 ring-1 ring-gray-900 focus-visible:ring-gray-700 rounded-xl p-2 w-full min-h-52"
						/>
					</div>
				</div>
				<div className="mt-2.5 flex justify-between items-center">
					{/* error goes here */}
					<div className="inline-flex items-center gap-x-2  text-sm text-error" />
					<Button size="sm">Submit</Button>
				</div>
			</form>
		</div>
	);
}
