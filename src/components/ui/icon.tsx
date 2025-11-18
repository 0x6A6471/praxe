import { Match } from "effect";
import sprite from "/sprite.svg?url";
import type { IconBase, IconVariant } from "@/utils/icons";

type Props = {
	name: IconBase;
	className?: string;
	variant?: IconVariant;
	size?: string;
};

export default function Icon({
	name,
	className,
	size = "16",
	variant = "line",
}: Props) {
	const n = Match.value(variant).pipe(
		Match.when("filled", () => `${name}-filled`),
		Match.when("line", () => `${name}`),
		Match.exhaustive,
	);

	return (
		<svg className={className} height={size} width={size}>
			<title>{name}</title>
			<use href={`${sprite}#${n}`} height={size} width={size} />
		</svg>
	);
}
