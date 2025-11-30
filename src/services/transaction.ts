import { Transaction } from "bitcoinjs-lib";
import { Effect } from "effect";

export type ParsedTransaction = Transaction;

export const processTransaction = (
	input: string,
): Effect.Effect<ParsedTransaction, Error> => {
	const trimmedInput = input.trim();

	return Effect.try({
		try: () => Transaction.fromHex(trimmedInput),
		catch: (error) =>
			error instanceof Error
				? error
				: new Error("Unknown error parsing transaction"),
	});
};
