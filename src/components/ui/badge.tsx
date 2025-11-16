import type * as React from "react";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@/utils/class-names";

export const badgeVariants = cva(
	"inline-flex items-center justify-center rounded border px-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden ring-1",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-gray-900 text-gray-400 [a&]:hover:bg-primary/90 ring-gray-600",
				secondary:
					"border-transparent bg-inherit text-gray-600 [a&]:hover:bg-secondary/90 ring-gray-700",
				// destructive:
				// 	"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				// outline:
				// 	"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export default function Badge({
	className,
	variant,
	render = <span />,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { render?: useRender.RenderProp }) {
	return useRender({
		render,
		props: {
			"data-slot": "badge",
			className: cn(badgeVariants({ variant }), className),
			...props,
		},
	});
}
