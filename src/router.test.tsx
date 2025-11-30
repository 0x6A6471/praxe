// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { getRouter } from "./router";

describe("router", () => {
	it("creates a router instance", () => {
		const router = getRouter();
		expect(router).toBeDefined();
		expect(typeof router.navigate).toBe("function");
	});
});
