import { Match } from "effect";

import Icon from "@/components/ui/icon";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import UnitSwitcher from "@/components/unit-switcher";
import useDisplay from "@/hooks/useDisplay";
import type { ParsedPsbt } from "@/services/psbt";
import { formatBtc, formatSats } from "@/utils/formatters";
import Script from "./script";

type Props = {
	outputs: ParsedPsbt["outputs"];
};

export default function Outputs({ outputs }: Props) {
	const { unit } = useDisplay();

	if (outputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="output" /> <span>Outputs</span>
				</h2>
				<UnitSwitcher />
			</div>
			<ul className="space-y-4">
				{outputs.map((output, index) => {
					const { displayValue, tooltipLabel } = Match.value(unit).pipe(
						Match.when("btc", () => ({
							displayValue: `${formatBtc(Number(output.value))} BTC`,
							tooltipLabel: `${formatSats(Number(output.value))} sats`,
						})),
						Match.when("sats", () => ({
							displayValue: `${formatSats(Number(output.value))} sats`,
							tooltipLabel: `${formatBtc(Number(output.value))} BTC`,
						})),
						Match.exhaustive,
					);

					return (
						<li
							key={output.address}
							className="rounded-xl bg-background flex flex-col"
						>
							<div className="border-b border-border p-4">
								<h3 className="text-primary">outputs[{index}]</h3>
							</div>
							<dl className="divide-y divide-border">
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
									<dt>Value</dt>
									<dd className="sm:col-span-3">
										<Tooltip>
											<TooltipTrigger>{displayValue}</TooltipTrigger>
											<TooltipPopup>{tooltipLabel}</TooltipPopup>
										</Tooltip>
									</dd>
								</div>
								<Script
									label="Lock script"
									script={output.script}
									address={output.address}
								/>
							</dl>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
