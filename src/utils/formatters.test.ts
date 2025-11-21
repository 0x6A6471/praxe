import { describe, expect, it } from "vitest";

import { formatBtc, formatSats } from "./formatters";

describe("formatters utils", () => {
	describe("formatBtc", () => {
		it("should format a BTC value", () => {
			const sats = 100_000_000;
			const formatted = formatBtc(sats);

			expect(formatted).toBe("1");
		});

		it("should format a BTC value with decimal places", () => {
			const sats = 149_990_000;
			const formatted = formatBtc(sats);

			expect(formatted).toBe("1.4999");
		});

		it("should format a BTC value with all decimal places", () => {
			const sats = 123_456_789;
			const formatted = formatBtc(sats);

			expect(formatted).toBe("1.23456789");
		});
	});

	describe("formatSats", () => {
		it("should format sats", () => {
			const sats = 123456789;
			const formatted = formatSats(sats);

			expect(formatted).toBe("123,456,789");
		});

		it("should format sats with 0 decimal places", () => {
			const value = 123456789.0;
			const formatted = formatSats(value);

			expect(formatted).toBe("123,456,789");
		});
	});
});
