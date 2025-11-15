import type * as React from "react";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@/utils/class-names";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-gray-400 shadow-xs hover:bg-gray-300 text-gray-950 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-400",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	render?: useRender.RenderProp;
}

export default function Button({
	className,
	variant,
	size,
	type = "button",
	render = <button />,
	...props
}: ButtonProps) {
	return useRender({
		render,
		props: {
			"data-slot": "button",
			type,
			className: cn(buttonVariants({ variant, size, className })),
			...props,
		},
	});
}
