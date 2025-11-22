#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const spriteFile = path.join(__dirname, "../public/sprite.svg");
const outputFile = path.join(__dirname, "../src/types/icon.ts");

const spriteContent = fs.readFileSync(spriteFile, "utf-8");
// get all symbol IDs from the sprite
const symbolRegex = /<symbol\s+id="([^"]+)"/g;
const matches = Array.from(spriteContent.matchAll(symbolRegex));
const iconIds = matches.map((match) => match[1]);

iconIds.sort();

// group icons by variant
const baseIcons = new Set();
const variantMap: Record<string, string[]> = {};
iconIds.forEach((id) => {
	if (id.endsWith("-filled")) {
		const baseName = id.replace("-filled", "");
		baseIcons.add(baseName);
		if (!variantMap[baseName]) variantMap[baseName] = [];
		variantMap[baseName].push("filled");
	} else {
		baseIcons.add(id);
		if (!variantMap[id]) variantMap[id] = [];
		variantMap[id].push("line");
	}
});

// for icons that only exist as filled, they should still support "filled" variant
iconIds.forEach((id) => {
	if (id.endsWith("-filled") && !variantMap[id]) {
		variantMap[id] = ["filled"];
	}
});
const baseIconsArray = Array.from(baseIcons).sort();

// generate discriminated union types
const iconVariantTypes = baseIconsArray
	.map((name) => {
		const variants = variantMap[name as string] || ["line"];
		if (variants.length === 1) {
			return `{ name: "${name}"; variant?: "${variants[0]}" }`;
		} else {
			return `{ name: "${name}"; variant?: ${variants.map((v) => `"${v}"`).join(" | ")} }`;
		}
	})
	.join(" | ");

// generate TypeScript file
const typeContent = `/**
 * Icon types are automatically generated from the sprite.svg file.
 * This provides type-safe icon name selection with full autocomplete.
 *
 * To regenerate this file, run: bun run icongen
 */

export type IconProps = ${iconVariantTypes};

export type IconName = IconProps["name"];
export type IconVariant = "line" | "filled";

export const ICON_VARIANTS: Record<IconName, IconVariant[]> = {
${baseIconsArray
	.map((name) => {
		const variants = variantMap[name as string] || ["line"];
		return `	"${name}": [${variants.map((v) => `"${v}"`).join(", ")}]`;
	})
	.join(",\n")},
};

export function getIconId(name: IconName, variant: IconVariant = "line"): string {
	const variants = ICON_VARIANTS[name];
	if (!variants.includes(variant)) {
		console.warn(
			\`Icon "\${name}" does not support variant "\${variant}". Available variants: \${variants.join(", ")}\`,
		);
	}

	// filled icons
	if (variant === "filled") {
		return \`\${name}-filled\`;
	}

	return name;
}`;

fs.writeFileSync(outputFile, typeContent);
console.log(`✓ Generated icon types: ${outputFile}`);
console.log(
	`Found ${baseIconsArray.length} icons with ${baseIconsArray.length} total variants`,
);
