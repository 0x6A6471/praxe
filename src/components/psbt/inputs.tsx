import Icon from "@/components/ui/icon";
import type { ParsedPsbt } from "@/services/psbt";
import { hashToTxid } from "@/utils/bitcoin";
import Script from "./script";

type Props = {
	inputs: ParsedPsbt["inputs"];
};

export default function Inputs({ inputs }: Props) {
	if (inputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="input" /> <span>Inputs</span>
				</h2>
			</div>
			<ul className="space-y-4">
				{inputs.map((input, index) => (
					<li
						key={input.index}
						className="rounded-xl bg-background flex flex-col"
					>
						<div className="border-b border-border p-4">
							<h3 className="text-primary">inputs[{index}]</h3>
						</div>
						<dl className="divide-y divide-border">
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
							{input.sequence && (
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
									<dt>Sequence</dt>
									<dd className="sm:col-span-3 flex items-center gap-x-2">
										<p>{input.sequence}</p>
										<p className="text-muted-foreground font-mono">
											(0x{input.sequence.toString(16)})
										</p>
									</dd>
								</div>
							)}
							<Script label="Witness script" script={input.witnessScript} />
							<Script label="Redeem script" script={input.redeemScript} />
							<Script label="Unlock script" script={input.finalScriptSig} />
							<Script label="Final witness" script={input.finalScriptWitness} />
						</dl>
					</li>
				))}
			</ul>
		</div>
	);
}
