import { useCallback, useEffect, useRef, useState } from "react";
import { Effect } from "effect";

import {
	type ParsedTransaction,
	processTransaction,
} from "@/services/transaction";

export default function useTransaction() {
	const [transaction, setTransaction] = useState<ParsedTransaction>();
	const [error, setError] = useState<string | null>(null);
	const lastInputRef = useRef<string>("");

	const parse = useCallback(async (transactionInput: string) => {
		try {
			lastInputRef.current = transactionInput;
			const result = await Effect.runPromise(
				processTransaction(transactionInput),
			);
			setTransaction(result);
			setError(null);
		} catch (err) {
			setError((err as Error).message ?? "Invalid transaction");
		}
	}, []);

	function reset() {
		setTransaction(undefined);
		setError(null);
	}

	useEffect(() => {
		if (lastInputRef.current) {
			parse(lastInputRef.current);
		}
	}, [parse]);

	return { error, parse, transaction, reset };
}
