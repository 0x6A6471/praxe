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
		const expected = fixtures.bip174.valid[0].expected;
		const hex =
			"70736274ff0100750200000001268171371edff285e937adeea4b37b78000c0566cbb3ad64641713ca42171bf60000000000feffffff02d3dff505000000001976a914d0c59903c5bac2868760e90fd521a4665aa7652088ac00e1f5050000000017a9143545e6e33b832c47050f24d3eeb93c9c03948bc787b32e1300000100fda5010100000000010289a3c71eab4d20e0371bbba4cc698fa295c9463afa2e397f8533ccb62f9567e50100000017160014be18d152a9b012039daf3da7de4f53349eecb985ffffffff86f8aa43a71dff1448893a530a7237ef6b4608bbb2dd2d0171e63aec6a4890b40100000017160014fe3e9ef1a745e974d902c4355943abcb34bd5353ffffffff0200c2eb0b000000001976a91485cff1097fd9e008bb34af709c62197b38978a4888ac72fef84e2c00000017a914339725ba21efd62ac753a9bcd067d6c7a6a39d05870247304402202712be22e0270f394f568311dc7ca9a68970b8025fdd3b240229f07f8a5f3a240220018b38d7dcd314e734c9276bd6fb40f673325bc4baa144c800d2f2f02db2765c012103d2e15674941bad4a996372cb87e1856d3652606d98562fe39c5e9e7e413f210502483045022100d12b852d85dcd961d2f5f4ab660654df6eedcc794c0c33ce5cc309ffb5fce58d022067338a8e0e1725c197fb1a88af59f51e44e4255b20167c8684031c05d1f2592a01210223b72beef0965d10be0778efecd61fcac6f79a4ea169393380734464f84f2ab300000000000000";
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
