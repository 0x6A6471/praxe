import type { PsbtInput } from "bip174";
import type { Network, PsbtTxInput, PsbtTxOutput } from "bitcoinjs-lib";
import { Psbt } from "bitcoinjs-lib";
import { Effect } from "effect";

type Input = PsbtInput & PsbtTxInput;
type Ops = {
	network?: Network;
	maximumFeeRate?: number;
};

export type ParsedPsbt = {
	inputs: Input[];
	outputs: PsbtTxOutput[];
};

export const processPsbt = (
	input: string,
	opts?: Ops,
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
