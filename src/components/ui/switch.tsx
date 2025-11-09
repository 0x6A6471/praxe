import type * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch";

import cn from "@/utils/class-names";

function Switch({
	className,
	children,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer data-[checked]:bg-mint data-[unchecked]:bg-gray-900 focus-visible:border-gray-400 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children ?? <SwitchThumb />}
		</SwitchPrimitive.Root>
	);
}

function SwitchThumb({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Thumb>) {
	return (
		<SwitchPrimitive.Thumb
			data-slot="switch-thumb"
			className={cn(
				"bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[checked]:translate-x-[calc(100%-2px)] data-[unchecked]:translate-x-0",
				className,
			)}
			{...props}
		/>
	);
}

export { Switch, SwitchThumb };
