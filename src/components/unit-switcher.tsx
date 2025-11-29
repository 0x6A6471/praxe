import { useState } from "react";

import Button from "@/components/ui/core/button";
import Icon from "@/components/ui/core/icon";
import {
	Menu,
	MenuCheckboxItem,
	MenuPopup,
	MenuTrigger,
} from "@/components/ui/core/menu";
import {
	Tooltip,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/core/tooltip";
import useDisplay from "@/hooks/useDisplay";

export default function UnitSwitcher() {
	const { unit, setUnit } = useDisplay();
	const [isOpen, setIsOpen] = useState(false);

	function onCheckedChange(unit: "btc" | "sats") {
		setUnit(unit);
		setIsOpen(false);
	}

	return (
		<Menu open={isOpen} onOpenChange={setIsOpen}>
			<TooltipProvider delay={150}>
				<Tooltip>
					<TooltipTrigger
						render={
							<MenuTrigger
								render={
									<Button
										variant="outline"
										className="h-8 w-8 [&:is(:hover,[data-pressed])]:bg-popover"
									>
										<Icon name={unit} variant="filled" />
									</Button>
								}
							/>
						}
					/>
					<TooltipPopup>Change display unit</TooltipPopup>
				</Tooltip>
			</TooltipProvider>
			<MenuPopup align="start" sideOffset={4}>
				<MenuCheckboxItem
					checked={unit === "btc"}
					onCheckedChange={() => onCheckedChange("btc")}
				>
					<div className="inline-flex gap-x-2 items-center">
						<Icon name="btc" variant="filled" /> BTC
					</div>
				</MenuCheckboxItem>
				<MenuCheckboxItem
					checked={unit === "sats"}
					onCheckedChange={() => onCheckedChange("sats")}
				>
					<div className="inline-flex gap-x-2 items-center">
						<Icon name="sats" variant="filled" /> Sats
					</div>
				</MenuCheckboxItem>
			</MenuPopup>
		</Menu>
	);
}
