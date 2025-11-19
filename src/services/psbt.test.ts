import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import fixtures from "./__fixtures__/psbt.json";
import type { ParsedPsbt } from "./psbt";
import { processPsbt } from "./psbt";

describe("BIP174 processPsbt", () => {
	describe("invalid base64", () => {
		const invalidPsbts = fixtures.bip174.invalid;

		it.each(invalidPsbts)(
			"should throw '$errorMessage' for: $description",
			({ psbt, errorMessage }) => {
				expect(() => {
					Effect.runSync(processPsbt(psbt));
				}).toThrow(new RegExp(errorMessage, "i"));
			},
		);
	});
	describe("valid base64", () => {
		const validPsbts = fixtures.bip174.valid;

		it.each(validPsbts)(
			"should parse correctly: $description",
			({ psbt, expected }) => {
				const result = Effect.runSync(processPsbt(psbt));

				expect(result.version).toBe(expected.version);
				expect(result.locktime).toBe(expected.locktime);

				expect(result.inputs.length).toBe(expected.inputs.length);
				expect(result.outputs.length).toBe(expected.outputs.length);

				result.inputs.forEach((input) => {
					expect(input.hash).toBeInstanceOf(Uint8Array);
					expect(input.hash.length).toBe(32);
					expect(input.index).toBeGreaterThanOrEqual(0);
					expect(input.sequence).toBeGreaterThanOrEqual(0);
				});

				result.outputs.forEach((output) => {
					expect(typeof output.value).toBe("bigint");
					expect(output.value).toBeGreaterThanOrEqual(0n);
					expect(output.script).toBeInstanceOf(Uint8Array);
					expect(output.script.length).toBeGreaterThan(0);
				});
			},
		);
	});

	describe("valid hex", () => {
		const base64 = fixtures.bip174.valid[0].psbt;
		const hex = Buffer.from(base64, "base64").toString("hex");
		const expected = fixtures.bip174.valid[0].expected;

		it("should parse hex", () => {
			const result = Effect.runSync(processPsbt(hex));

			expect(result.version).toBe(expected.version);
			expect(result.locktime).toBe(expected.locktime);

			expect(result.inputs.length).toBe(expected.inputs.length);
			expect(result.outputs.length).toBe(expected.outputs.length);

			result.inputs.forEach((input) => {
				expect(input.hash).toBeInstanceOf(Uint8Array);
				expect(input.hash.length).toBe(32);
				expect(input.index).toBeGreaterThanOrEqual(0);
				expect(input.sequence).toBeGreaterThanOrEqual(0);
			});

			result.outputs.forEach((output) => {
				expect(typeof output.value).toBe("bigint");
				expect(output.value).toBeGreaterThanOrEqual(0n);
				expect(output.script).toBeInstanceOf(Uint8Array);
				expect(output.script.length).toBeGreaterThan(0);
			});
		});
	});

	describe("whitespace handling", () => {
		const psbt = fixtures.bip174.valid[0].psbt;

		it("should trim leading whitespace", () => {
			const paddedInput = `  \n  ${psbt}`;
			const result = Effect.runSync(processPsbt(paddedInput));

			expect(result).toBeDefined();
			expect(result.inputs.length).toBeGreaterThan(0);
		});

		it("should trim trailing whitespace", () => {
			const paddedInput = `${psbt}  \n  `;
			const result = Effect.runSync(processPsbt(paddedInput));

			expect(result).toBeDefined();
			expect(result.inputs.length).toBeGreaterThan(0);
		});

		it("should trim both leading and trailing whitespace", () => {
			const paddedInput = `\t${psbt}\t`;
			const result = Effect.runSync(processPsbt(paddedInput));

			expect(result).toBeDefined();
			expect(result.inputs.length).toBeGreaterThan(0);
		});
	});
	describe("parsed PSBT structure", () => {
		const psbt = fixtures.bip174.valid[0].psbt;

		it("should return ParsedPsbt type with correct shape", () => {
			const result = Effect.runSync(processPsbt(psbt)) as ParsedPsbt;

			const expectedKeys = ["version", "locktime", "inputs", "outputs"].sort();
			const actualKeys = Object.keys(result).sort();

			expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
		});

		it("should have inputs that contain both BIP174 and transaction input properties", () => {
			const result = Effect.runSync(processPsbt(psbt));
			const firstInput = result.inputs[0];

			expect(firstInput).toBeDefined();
			expect(typeof firstInput).toBe("object");
		});

		it("should have outputs with value and script properties", () => {
			const result = Effect.runSync(processPsbt(psbt));
			const firstOutput = result.outputs[0];

			expect(firstOutput).toHaveProperty("value");
			expect(firstOutput).toHaveProperty("script");
		});
	});
});
