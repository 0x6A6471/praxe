import { type Payment, payments, Transaction } from "bitcoinjs-lib";

export function getOutputScriptFromNonWitnessUtxo(
	nonWitnessUtxo: Uint8Array,
	inputIndex: number,
): Uint8Array | undefined {
	try {
		const tx = Transaction.fromBuffer(nonWitnessUtxo);
		return tx.outs[inputIndex]?.script;
	} catch {
		return undefined;
	}
}

export function hashToTxid(hash: Uint8Array): string {
	let result = "";
	for (let i = hash.length - 1; i >= 0; i--) {
		result += hash[i].toString(16).padStart(2, "0");
	}
	return result;
}

export function isOpCode(value: string): boolean {
	return typeof value === "string" && value.startsWith("OP_");
}

export const getScriptType = (
	script: Uint8Array,
	isWitness?: boolean,
	isUnlockScript?: boolean,
	outputScript?: Uint8Array,
): string => {
	if (isWitness) {
		const items = extractWitnessStack(script);
		// p2wpkh has 2 items (signature + pubkey)
		if (items.length === 2) {
			const lastItem = items[items.length - 1];
			// if last item is 33 or 65 bytes (pubkey length in hex), it's p2wpkh
			if (lastItem.length === 66 || lastItem.length === 130) {
				return "p2wpkh";
			}
		}

		// otherwise it's p2wsh (witness script hash)
		return "p2wsh";
	}

	// for unlock scripts, check the output script being spent
	if (isUnlockScript && outputScript) {
		return getScriptType(outputScript, false, false);
	}

	const tryPayment = (
		name: string,
		fn: (config: { output: Uint8Array }) => Payment,
	) => {
		try {
			return fn({ output: script }) ? name : null;
		} catch {
			return null;
		}
	};
	return (
		[
			tryPayment("p2pkh", payments.p2pkh),
			tryPayment("p2wpkh", payments.p2wpkh),
			tryPayment("p2wsh", payments.p2wsh),
			tryPayment("p2sh", payments.p2sh),
			tryPayment("p2tr", payments.p2tr),
			tryPayment("p2pk", payments.p2pk),
			tryPayment("p2ms", payments.p2ms),
			tryPayment("embed", payments.embed),
		].find((r) => r !== null) ?? "unknown"
	);
};

export function extractWitnessStack(witness: Uint8Array): string[] {
	const hexString = Array.from(witness)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	let offset = 0;
	const itemCount = parseInt(hexString.slice(offset, offset + 2), 16);
	offset += 2;

	const items: string[] = [];
	for (let i = 0; i < itemCount; i++) {
		const length = parseInt(hexString.slice(offset, offset + 2), 16);
		offset += 2;
		const item = hexString.slice(offset, offset + length * 2);
		items.push(item);
		offset += length * 2;
	}

	return items;
}
