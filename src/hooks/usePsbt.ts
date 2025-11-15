import { useState } from "react";
import { Effect } from "effect";

import { type ParsedPsbt, processPsbt } from "@/services/psbt";

export default function usePsbt() {
	const [psbt, setPsbt] = useState<ParsedPsbt>();
	const [error, setError] = useState<string | null>(null);

	function parse(psbtInput: string) {
		try {
			const result = Effect.runSync(processPsbt(psbtInput));
			setPsbt(result);
			setError(null);
		} catch (err) {
			setError((err as Error).message ?? "Invalid PSBT");
		}
	}

	return { error, parse, psbt, setError, setPsbt };
}
