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
							{input.witnessScript && (
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
									<dt>Script</dt>
									<dd className="sm:col-span-3 space-y-6">
										<div className="flex flex-col md:flex-row justify-between md:items-center">
											<div className="flex items-center space-x-2">
												<Badge variant="secondary">
													{getScriptType(input.witnessScript)}
												</Badge>
												<p>Witness script</p>
											</div>
										</div>
										<div className="space-y-1 flex flex-col">
											{script
												.toASM(input.witnessScript)
												.split(" ")
												.map((text, idx) => (
													<ScriptText
														key={`${input.index}-script-${idx}`}
														label={text}
													/>
												))}
										</div>
									</dd>
								</div>
							)}
							{input.finalScriptSig && (
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
									<dt>Script</dt>
									<dd className="sm:col-span-3 space-y-6">
										<div className="flex flex-col md:flex-row justify-between md:items-center">
											<div className="flex items-center space-x-2">
												<Badge variant="secondary">
													{getScriptType(input.finalScriptSig)}
												</Badge>
												<p>Unlock script</p>
											</div>
										</div>
										<div className="space-y-1 flex flex-col">
											{script
												.toASM(input.finalScriptSig)
												.split(" ")
												.map((text, idx) => (
													<ScriptText
														key={`${input.index}-script-${idx}`}
														label={text}
													/>
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
