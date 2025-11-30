import { describe, expect, it } from "vitest";

import cn from "./class-names";

describe("class-names", () => {
	describe("strings", () => {
		it("concats strings", () => {
			const classNames = cn("foo", "bar", "baz");
			expect(classNames).toBe("foo bar baz");
		});
	});

	describe("objects", () => {
		it("should handle object with boolean values", () => {
			const classNames = cn({ active: true, disabled: false });
			expect(classNames).toBe("active");
		});

		it("should handle mixed strings and objects", () => {
			const classNames = cn("base", { active: true, hidden: false });
			expect(classNames).toBe("base active");
		});
	});

	describe("arrays", () => {
		it("should handle arrays", () => {
			const classNames = cn(["foo", "bar"], "baz");
			expect(classNames).toBe("foo bar baz");
		});

		it("should handle arrays with objects", () => {
			const classNames = cn(["base"], { active: true });
			expect(classNames).toBe("base active");
		});
	});

	describe("tw-merge", () => {
		it("should merge conflicting tailwind width classes", () => {
			const classNames = cn("w-full", "w-1/2");
			expect(classNames).toBe("w-1/2");
		});

		it("should merge conflicting padding classes", () => {
			const classNames = cn("p-4", "p-2");
			expect(classNames).toBe("p-2");
		});

		it("should preserve non-conflicting classes", () => {
			const classNames = cn("w-full", "bg-red-500");
			expect(classNames).toBe("w-full bg-red-500");
		});
	});

	describe("edge cases", () => {
		it("should handle null and undefined", () => {
			const classNames = cn("foo", null, "bar", undefined);
			expect(classNames).toBe("foo bar");
		});

		it("should handle empty inputs", () => {
			const classNames = cn("");
			expect(classNames).toBe("");
		});
	});
});
