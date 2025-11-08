import { Match } from "effect";

type Props = {
	name: string;
	className: string;
	variant?: "filled" | "line";
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
			<use href={`/sprite.svg#${n}`} height={size} width={size} />
		</svg>
	);
}
