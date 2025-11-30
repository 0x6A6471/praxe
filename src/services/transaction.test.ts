import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import type { ParsedTransaction } from "@/services/transaction";
import fixtures from "./__fixtures__/transaction.json";
import { processTransaction } from "./transaction";

describe("transaction service", () => {
	describe("invalid", () => {
		const invalidTxns = fixtures.invalid.fromBuffer;

		it.each(invalidTxns)("should throw $exception", ({ hex, exception }) => {
			expect(() => {
				Effect.runSync(processTransaction(hex));
			}).toThrow(new RegExp(exception, "i"));
		});
	});

	describe("valid hex", () => {
		const hex = fixtures.valid[0].hex;
		const expected = fixtures.valid[0];

		it("should parse hex", () => {
			const result = Effect.runSync(processTransaction(hex));

			expect(result.getId()).toBe(expected.id);
			expect(result.version).toBe(expected.raw.version);
			expect(result.locktime).toBe(expected.raw.locktime);

			expect(result.ins.length).toBe(expected.raw.ins.length);
			expect(result.outs.length).toBe(expected.raw.outs.length);

			result.ins.forEach((input) => {
				expect(input.hash).toBeInstanceOf(Uint8Array);
				expect(input.hash.length).toBe(32);
				expect(input.index).toBeGreaterThanOrEqual(0);
				expect(input.sequence).toBeGreaterThanOrEqual(0);
			});

			result.outs.forEach((output) => {
				expect(typeof output.value).toBe("bigint");
				expect(output.value).toBeGreaterThanOrEqual(0n);
				expect(output.script).toBeInstanceOf(Uint8Array);
				expect(output.script.length).toBeGreaterThan(0);
			});
		});
	});

	describe("whitespace handling", () => {
		const psbt = fixtures.valid[0].hex;

		it("should trim leading whitespace", () => {
			const paddedInput = `  \n  ${psbt}`;
			const result = Effect.runSync(processTransaction(paddedInput));

			expect(result).toBeDefined();
			expect(result.ins.length).toBeGreaterThan(0);
		});

		it("should trim trailing whitespace", () => {
			const paddedInput = `${psbt}  \n  `;
			const result = Effect.runSync(processTransaction(paddedInput));

			expect(result).toBeDefined();
			expect(result.ins.length).toBeGreaterThan(0);
		});

		it("should trim both leading and trailing whitespace", () => {
			const paddedInput = `\t${psbt}\t`;
			const result = Effect.runSync(processTransaction(paddedInput));

			expect(result).toBeDefined();
			expect(result.ins.length).toBeGreaterThan(0);
		});
	});

	describe("parsed Transaction structure", () => {
		const txn = fixtures.valid[0].hex;

		it("should return ParsedTransaction type with correct shape", () => {
			const result = Effect.runSync(
				processTransaction(txn),
			) as ParsedTransaction;

			const expectedKeys = ["version", "locktime", "ins", "outs"].sort();
			const actualKeys = Object.keys(result).sort();

			expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
		});

		it("should have outputs with value and script properties", () => {
			const result = Effect.runSync(processTransaction(txn));
			const firstOutput = result.outs[0];

			expect(firstOutput).toHaveProperty("value");
			expect(firstOutput).toHaveProperty("script");
		});
	});
});
