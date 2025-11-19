import type { PsbtInput } from "bip174";
import type { Network, PsbtTxInput, PsbtTxOutput } from "bitcoinjs-lib";
import { Psbt } from "bitcoinjs-lib";
import { Effect } from "effect";

type Input = PsbtInput & PsbtTxInput;
type Opts = {
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
		catch: () => new Error("Invalid hex PSBT"),
	});

	const parseBase64 = Effect.try({
		try: () => Psbt.fromBase64(trimmedInput, { ...opts }),
		catch: () => new Error("Invalid base64 PSBT"),
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
		Effect.mapError(
			() => new Error("Invalid input. Not a valid hex or base64 string."),
		),
	);
};
