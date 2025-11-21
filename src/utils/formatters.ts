export function formatBtc(value: number): string {
	return Number(value * 1e-8).toLocaleString("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 8,
	});
}

export function formatSats(value: number): string {
	return value.toLocaleString("en-US");
}
