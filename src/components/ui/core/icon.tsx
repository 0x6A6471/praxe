import type { IconProps } from "@/types/icon";
import { getIconId } from "@/types/icon";
import sprite from "/sprite.svg?url";

type Props = IconProps & {
	className?: string;
	size?: string;
};

export default function Icon({
	name,
	className,
	size = "16",
	variant = "line",
}: Props) {
	const iconId = getIconId(name, variant);

	return (
		<svg className={className} height={size} width={size}>
			<title>{name}</title>
			<use href={`${sprite}#${iconId}`} height={size} width={size} />
		</svg>
	);
}
