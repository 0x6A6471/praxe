export function formatBtc(value: number): string {
	return Number(value).toFixed(8);
}

export function formatSats(value: number): string {
	return (value / 100_000_000).toFixed(8);
}
