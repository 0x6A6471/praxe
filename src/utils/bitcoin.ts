import { type Payment, payments } from "bitcoinjs-lib";

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

export const getScriptType = (script: Buffer): string => {
	const tryPayment = (
		name: string,
		fn: (config: { output: Buffer }) => Payment,
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
