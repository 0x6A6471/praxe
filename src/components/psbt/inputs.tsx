import { script } from "bitcoinjs-lib";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import type { ParsedPsbt } from "@/services/psbt";
import { getScriptType, hashToTxid } from "@/utils/bitcoin";

type Props = {
	inputs: ParsedPsbt["inputs"];
};

export default function Inputs({ inputs }: Props) {
	if (inputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg text-gray-50">
					<Icon name="input" /> <span>Inputs</span>
				</h2>
			</div>
			<ul className="space-y-4">
				{inputs.map((input, index) => (
					<li
						key={input.index}
						className="rounded-xl bg-gray-950 flex flex-col"
					>
						<div className="border-b border-gray-900/50 p-4">
							<h3 className="text-candle">inputs[{index}]</h3>
						</div>
						<dl className="divide-y divide-gray-900/50">
							<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
								<dt>Previous TX ID</dt>
								<dd className="sm:col-span-3 font-mono">
									{hashToTxid(input.hash)}
								</dd>{" "}
							</div>
							<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
								<dt>Previous output index</dt>
								<dd className="sm:col-span-3">{input.index}</dd>
							</div>
							<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
								<dt>Sequence</dt>
								<dd className="sm:col-span-3 space-y-6">{input.sequence}</dd>
							</div>
							{input.witnessScript && (
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
									<dt>Script</dt>
									<dd className="sm:col-span-3 space-y-6">
										<div className="flex flex-col md:flex-row justify-between md:items-center">
											<div className="flex items-center space-x-2">
												<Badge>
													{getScriptType(input.witnessScript as Buffer)}
												</Badge>
												<p className="text-xs">Witness script</p>
											</div>
										</div>
										<div className="space-y-1 flex flex-col">
											{script
												.toASM(input.witnessScript)
												.split(" ")
												.map((text) => (
													<ScriptText key={text} label={text} />
												))}
										</div>
									</dd>
								</div>
							)}
						</dl>
					</li>
				))}
			</ul>
		</div>
	);
}
