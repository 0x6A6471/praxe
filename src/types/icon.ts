/**
 * Icon types are automatically generated from the sprite.svg file.
 * This provides type-safe icon name selection with full autocomplete.
 *
 * To regenerate this file, run: bun run icongen
 */

export type IconProps =
	| { name: "alert-triangle"; variant?: "line" }
	| { name: "brackets"; variant?: "line" }
	| { name: "btc"; variant?: "filled" }
	| { name: "github"; variant?: "filled" }
	| { name: "input"; variant?: "line" }
	| { name: "output"; variant?: "line" }
	| { name: "sats"; variant?: "filled" };

export type IconName = IconProps["name"];
export type IconVariant = "line" | "filled";

export const ICON_VARIANTS: Record<IconName, IconVariant[]> = {
	"alert-triangle": ["line"],
	brackets: ["line"],
	btc: ["filled"],
	github: ["filled"],
	input: ["line"],
	output: ["line"],
	sats: ["filled"],
};

export function getIconId(
	name: IconName,
	variant: IconVariant = "line",
): string {
	const variants = ICON_VARIANTS[name];
	if (!variants.includes(variant)) {
		console.warn(
			`Icon "${name}" does not support variant "${variant}". Available variants: ${variants.join(", ")}`,
		);
	}

	// filled icons
	if (variant === "filled") {
		return `${name}-filled`;
	}

	return name;
}

