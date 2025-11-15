import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Inputs from "@/components/psbt/inputs";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import usePsbt from "@/hooks/usePsbt";
import cn from "@/utils/class-names";

export const Route = createFileRoute("/psbt")({
	head: () => ({
		meta: [
			{
				title: "psbt | praxe",
			},
		],
	}),
	component: PsbtPage,
});

function PsbtPage() {
	const [userInput, setUserInput] = useState("");
	const { psbt, error, parse, reset } = usePsbt();

	function handlTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		reset();
		setUserInput(e.target.value);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		parse(userInput);
	}

	return (
		<div className="space-y-16 w-full">
			<form onSubmit={handleSubmit}>
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
							onChange={handlTextareaChange}
							value={userInput}
						/>
					</div>
				</div>
				<div
					className={cn(
						error ? "justify-between" : "justify-end",
						"mt-2 flex items-center",
					)}
				>
					{error && (
						<div className="inline-flex items-center gap-x-2  text-sm text-error">
							<Icon name="alert-triangle" /> <span>{error}</span>
						</div>
					)}
					<Button type="submit" size="sm">
						Submit
					</Button>
				</div>
			</form>
			<Inputs inputs={psbt?.inputs ?? []} />
		</div>
	);
}
