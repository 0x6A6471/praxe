import { script } from "bitcoinjs-lib";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import type { ParsedPsbt } from "@/services/psbt";
import { getScriptType } from "@/utils/bitcoin";

type Props = {
	outputs: ParsedPsbt["outputs"];
};

export default function Outputs({ outputs }: Props) {
	if (outputs.length === 0) return null;
	// let display = useContext Ctx.Display.display_context in
	// let tooltip_trigger value =
	//   match display.unit with
	//   | "btc" -> Number_fns.btc_of_sats value ^ " BTC"
	//   | _ -> Js.Bigint.toString value ^ " sats"
	// in
	//
	// let tooltip_label value =
	//   match display.unit with
	//   | "btc" -> Js.Bigint.toString value ^ " sats"
	//   | _ -> Number_fns.btc_of_sats value ^ " BTC"
	// in
	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="output" /> <span>Outputs</span>
				</h2>
				{/*<Unit_switcher />*/}
			</div>
			<ul className="space-y-4">
				{outputs.map((output, index) => (
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
								{/*<dd className="sm:col-span-3">
                     <Ui.Tooltip label=(tooltip_label output.value)
                                 trigger=(tooltip_trigger output.value) />
                   </dd>*/}
							</div>
							<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
								<dt>Script</dt>
								<dd className="sm:col-span-3 space-y-6">
									{output.address && (
										<div className="flex flex-col md:flex-row justify-between md:items-center">
											<div className="flex items-center space-x-1">
												<Badge>{getScriptType(output.script as Buffer)}</Badge>
												<p className="text-xs">Lock script</p>
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
				))}
			</ul>
		</div>
	);
}
