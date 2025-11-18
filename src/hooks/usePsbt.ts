import { useCallback, useEffect, useRef, useState } from "react";
import { Effect } from "effect";

import { type ParsedPsbt, processPsbt } from "@/services/psbt";
import useDisplay from "./useDisplay";

export default function usePsbt() {
	const { network } = useDisplay();
	const [psbt, setPsbt] = useState<ParsedPsbt>();
	const [error, setError] = useState<string | null>(null);
	const lastInputRef = useRef<string>("");

	const parse = useCallback(
		(psbtInput: string) => {
			try {
				lastInputRef.current = psbtInput;
				const result = Effect.runSync(processPsbt(psbtInput, { network }));
				setPsbt(result);
				setError(null);
			} catch (err) {
				setError((err as Error).message ?? "Invalid PSBT");
			}
		},
		[network],
	);

	function reset() {
		setPsbt(undefined);
		setError(null);
	}

	useEffect(() => {
		if (lastInputRef.current) {
			parse(lastInputRef.current);
		}
	}, [parse]);

	return { error, parse, psbt, reset };
}
