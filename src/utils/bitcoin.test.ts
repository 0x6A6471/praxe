import { Transaction } from "bitcoinjs-lib";
import { describe, expect, it } from "vitest";

import { scriptFixtures, witnessFixtures } from "./__fixtures__/scripts";
import {
	extractWitnessStack,
	getOutputScriptFromNonWitnessUtxo,
	getScriptType,
	hashToTxid,
	isOpCode,
} from "./bitcoin";

describe("bitcoin utils", () => {
	describe("hashToTxid", () => {
		it("should convert a 32-byte hash to txid format (reversed)", () => {
			const hash = new Uint8Array([
				88, 232, 122, 33, 181, 109, 175, 12, 35, 190, 142, 112, 112, 69, 108,
				51, 111, 124, 186, 165, 200, 117, 121, 36, 245, 69, 136, 123, 178, 171,
				221, 117,
			]);
			const txid = hashToTxid(hash);

			expect(txid).toBe(
				"75ddabb27b8845f5247975c8a5ba7c6f336c4570708ebe230caf6db5217ae858",
			);
		});

		it("should pad single digit hex values", () => {
			const hash = new Uint8Array([
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
				21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
			]);
			const txid = hashToTxid(hash);

			expect(txid).toHaveLength(64);
			expect(txid).toMatch(/^[0-9a-f]+$/);
		});
	});

	describe("isOpCode", () => {
		it("should return true for valid opcodes", () => {
			expect(isOpCode("OP_0")).toBe(true);
			expect(isOpCode("OP_1")).toBe(true);
			expect(isOpCode("OP_DUP")).toBe(true);
			expect(isOpCode("OP_HASH160")).toBe(true);
			expect(isOpCode("OP_CHECKSIG")).toBe(true);
		});

		it("should return false for non-opcodes", () => {
			expect(isOpCode("OP")).toBe(false);
			expect(isOpCode("DUP")).toBe(false);
			expect(isOpCode("0")).toBe(false);
			expect(isOpCode("abc123")).toBe(false);
			expect(isOpCode("")).toBe(false);
		});
	});

	describe("getScriptType", () => {
		it("should identify p2pkh output script", () => {
			const type = getScriptType(scriptFixtures.p2pkh);
			expect(type).toBe("p2pkh");
		});

		it("should identify p2wpkh output script", () => {
			const type = getScriptType(scriptFixtures.p2wpkh);
			expect(type).toBe("p2wpkh");
		});

		it("should identify p2wsh output script", () => {
			const type = getScriptType(scriptFixtures.p2wsh);
			expect(type).toBe("p2wsh");
		});

		it("should identify p2sh output script", () => {
			const type = getScriptType(scriptFixtures.p2sh);
			expect(type).toBe("p2sh");
		});

		it("should identify p2pk output script", () => {
			const type = getScriptType(scriptFixtures.p2pk);
			expect(type).toBe("p2pk");
		});

		it("should identify p2ms output script", () => {
			const type = getScriptType(scriptFixtures.p2ms);
			expect(type).toBe("p2ms");
		});

		it.skip("should identify p2tr output script", () => {
			const type = getScriptType(scriptFixtures.p2tr);
			expect(type).toBe("p2tr");
		});

		it("should identify embed output script", () => {
			const type = getScriptType(scriptFixtures.embed);
			expect(type).toBe("embed");
		});

		it("should return 'unknown' for unrecognized scripts", () => {
			const type = getScriptType(scriptFixtures.unknown);
			expect(type).toBe("unknown");
		});

		it("should identify p2wpkh witness data", () => {
			const type = getScriptType(witnessFixtures.p2wpkh, true);
			expect(type).toBe("p2wpkh");
		});

		it("should identify p2wsh witness data", () => {
			const type = getScriptType(witnessFixtures.p2wsh, true);
			expect(type).toBe("p2wsh");
		});
	});

	describe("extractWitnessStack", () => {
		it("should extract p2wpkh witness items", () => {
			const items = extractWitnessStack(witnessFixtures.p2wpkh);
			expect(items).toHaveLength(2);
			expect(items[0]).toHaveLength(71 * 2); // 71 bytes in hex
			expect(items[1]).toHaveLength(33 * 2); // 33 bytes in hex
		});

		it("should extract p2wsh witness items", () => {
			const items = extractWitnessStack(witnessFixtures.p2wsh);
			expect(items).toHaveLength(3);
			expect(items[0]).toHaveLength(71 * 2);
			expect(items[1]).toHaveLength(71 * 2);
			expect(items[2]).toHaveLength(32 * 2);
		});

		it("should handle empty witness", () => {
			const items = extractWitnessStack(witnessFixtures.empty);
			expect(items).toHaveLength(0);
		});
	});

	describe("getOutputScriptFromNonWitnessUtxo", () => {
		it.skip("should extract output script from a transaction", () => {
			const tx = new Transaction();
			tx.addOutput(scriptFixtures.p2pkh, 50000n);

			const serialized = tx.toBuffer();
			const extracted = getOutputScriptFromNonWitnessUtxo(serialized, 0);

			expect(extracted).toBeDefined();
			expect(extracted).toEqual(scriptFixtures.p2pkh);
		});

		it("should return undefined for invalid transaction data", () => {
			const invalidTx = new Uint8Array([]);
			const result = getOutputScriptFromNonWitnessUtxo(invalidTx, 0);
			expect(result).toBeUndefined();
		});
	});
});
