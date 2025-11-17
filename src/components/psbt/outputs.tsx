import { script } from "bitcoinjs-lib";
import { Match } from "effect";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import UnitSwitcher from "@/components/unit-switcher";
import useDisplay from "@/hooks/useDisplay";
import type { ParsedPsbt } from "@/services/psbt";
import { getScriptType } from "@/utils/bitcoin";
import { formatBtc, formatSats } from "@/utils/formatters";

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
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
									<dt>Script</dt>
									<dd className="sm:col-span-3 space-y-6">
										{output.address && (
											<div className="flex flex-col md:flex-row justify-between md:items-center">
												<div className="flex items-center space-x-1">
													<Badge variant="secondary">
														{getScriptType(output.script as Buffer)}
													</Badge>
													<p>Lock script</p>
												</div>
												<p className="font-mono">{output.address}</p>
											</div>
										)}
										<div className="space-y-1 flex flex-col">
											{script
												.toASM(output.script)
												.split(" ")
												.map((text) => (
													<ScriptText key={text} label={text} />
												))}
										</div>
									</dd>
								</div>
							</dl>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
