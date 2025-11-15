import { useReducer } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { PsbtInput } from "bip174";
import type { PsbtTxInput } from "bitcoinjs-lib";
import { Effect } from "effect";

import Inputs from "@/components/psbt/inputs";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { processPsbt } from "@/services/psbt";
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

export type Input = PsbtInput & PsbtTxInput;

type T = {
	inputs: Input[];
};
type Action =
	| { type: "SET_USER_INPUT"; payload: string }
	| { type: "SET_PSBT"; payload: T }
	| { type: "SET_ERROR"; payload: string | null };

type State = {
	user_input: string;
	psbt: T;
	error: string | null;
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_USER_INPUT":
			return { ...state, user_input: action.payload };
		case "SET_PSBT":
			return { ...state, psbt: action.payload };
		case "SET_ERROR":
			return { ...state, error: action.payload };
	}
}

function PsbtPage() {
	const [state, dispatch] = useReducer(reducer, {
		user_input: "",
		psbt: { inputs: [] },
		error: null,
	});

	function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		// clear error on change
		if (state.error) {
			dispatch({ type: "SET_ERROR", payload: null });
		}
		// clear psbt on change
		if (state.psbt.inputs?.length) {
			dispatch({ type: "SET_PSBT", payload: { inputs: [] } });
		}
		// update input
		dispatch({ type: "SET_USER_INPUT", payload: e.target.value });
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const inputs = Effect.runSync(processPsbt(state.user_input));
			dispatch({ type: "SET_PSBT", payload: { inputs } });
			dispatch({ type: "SET_ERROR", payload: null });
		} catch (err) {
			dispatch({
				type: "SET_ERROR",
				payload: (err as Error).message ?? "Invalid PSBT",
			});
		}
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
							onChange={handleTextareaChange}
							value={state.user_input}
						/>
					</div>
				</div>
				<div
					className={cn(
						state.error ? "justify-between" : "justify-end",
						"mt-2 flex items-center",
					)}
				>
					{state.error && (
						<div className="inline-flex items-center gap-x-2  text-sm text-error">
							<Icon name="alert-triangle" /> <span>{state.error}</span>
						</div>
					)}
					<Button type="submit" size="sm">
						Submit
					</Button>
				</div>
			</form>
			<Inputs inputs={state.psbt.inputs} />
		</div>
	);
}
