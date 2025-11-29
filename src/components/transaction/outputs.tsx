import { address, type Transaction } from "bitcoinjs-lib";
import { Match } from "effect";

import Badge from "@/components/ui/core/badge";
import Icon from "@/components/ui/core/icon";
import {
	Tooltip,
	TooltipPopup,
	TooltipTrigger,
} from "@/components/ui/core/tooltip";
import UnitSwitcher from "@/components/unit-switcher";
import useDisplay from "@/hooks/useDisplay";
import { formatBtc, formatSats } from "@/utils/formatters";
import Script from "../psbt/script";

type Props = {
	outputs: Transaction["outs"];
};

export default function Outputs({ outputs }: Props) {
	const { network, unit } = useDisplay();

	if (outputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="output" /> <span>Outputs</span>
					<Badge>{outputs.length}</Badge>
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

					let addr: string | undefined;
					try {
						addr = address.fromOutputScript(output.script, network);
					} catch {}

					return (
						<li
							key={addr ?? index}
							className="rounded-xl bg-background flex flex-col"
						>
							<div className="border-b border-border p-4">
								<h3 className="text-primary">#{index}</h3>
							</div>
							<dl className="divide-y divide-border">
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
									<dt className="text-muted-foreground">Value</dt>
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
									address={addr}
								/>
							</dl>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
