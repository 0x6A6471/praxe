import type { Transaction } from "bitcoinjs-lib";

import Badge from "@/components/ui/core/badge";
import Icon from "@/components/ui/core/icon";
import Script from "@/components/ui/shared/script";
import { hashToTxid } from "@/utils/bitcoin";

type Props = {
	inputs: Transaction["ins"];
};

export default function Inputs({ inputs }: Props) {
	if (inputs.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="input" /> <span>Inputs</span>
					<Badge>{inputs.length}</Badge>
				</h2>
			</div>
			<ul className="space-y-4">
				{inputs.map((input, index) => {
					return (
						<li
							key={input.index}
							className="rounded-xl bg-background flex flex-col"
						>
							<div className="border-b border-border p-4">
								<h3 className="text-primary">#{index}</h3>
							</div>
							<dl className="divide-y divide-border">
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
									<dt className="text-muted-foreground">Previous TX ID</dt>
									<dd className="sm:col-span-3 font-mono">
										{hashToTxid(input.hash)}
									</dd>
								</div>
								<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
									<dt className="text-muted-foreground">
										Previous output index
									</dt>
									<dd className="sm:col-span-3">{input.index}</dd>
								</div>
								{input.sequence && (
									<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
										<dt className="text-muted-foreground">Sequence</dt>
										<dd className="sm:col-span-3 flex items-center gap-x-2">
											<p>{input.sequence}</p>
											<p className="text-muted-foreground font-mono">
												(0x{input.sequence.toString(16)})
											</p>
										</dd>
									</div>
								)}
								<Script label="Unlock script" script={input.script} />
								<Script label="Witness script" script={input.witness} />
							</dl>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
