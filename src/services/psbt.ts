import type { PsbtInput } from "bip174";
import type { Network, PsbtTxInput, PsbtTxOutput } from "bitcoinjs-lib";
import { Psbt } from "bitcoinjs-lib";
import { Effect } from "effect";

type Input = PsbtInput & PsbtTxInput;
export type Opts = {
	network?: Network;
	maximumFeeRate?: number;
};

export type ParsedPsbt = {
	locktime: number;
	version: number;
	inputs: Input[];
	outputs: PsbtTxOutput[];
};

export const processPsbt = (
	input: string,
	opts?: Opts,
): Effect.Effect<ParsedPsbt, Error> => {
	const trimmedInput = input.trim();

	const parseHex = Effect.try({
		try: () => Psbt.fromHex(trimmedInput, { ...opts }),
		catch: (error) => error,
	});

	const parseBase64 = Effect.try({
		try: () => Psbt.fromBase64(trimmedInput, { ...opts }),
		catch: (error) => error,
	});

	return parseHex.pipe(
		Effect.orElse(() => parseBase64),
		Effect.map((psbt) => ({
			locktime: psbt.locktime,
			version: psbt.version,
			inputs: psbt.data.inputs.map(
				(bip174Input, index) =>
					({
						...bip174Input,
						...psbt.txInputs[index],
					}) as Input,
			),
			outputs: psbt.txOutputs,
		})),
		Effect.mapError((error) =>
			error instanceof Error ? error : new Error("Unknown error parsing PSBT"),
		),
	);
};
