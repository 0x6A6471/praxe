import type { PsbtInputUpdate } from "bip174";
import type { PsbtTxOutput } from "bitcoinjs-lib";
import { script as bjsScript } from "bitcoinjs-lib";
import { Match } from "effect";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/badge";
import { extractWitnessStack, getScriptType } from "@/utils/bitcoin";

type ScriptLabel =
	| "Witness script"
	| "Redeem script"
	| "Unlock script"
	| "Final witness"
	| "Lock script";
type Props = {
	label: ScriptLabel;
	script:
		| PsbtInputUpdate["witnessScript"]
		| PsbtInputUpdate["redeemScript"]
		| PsbtInputUpdate["finalScriptSig"]
		| PsbtInputUpdate["finalScriptWitness"]
		| PsbtTxOutput["script"];
	// address is only used for lock script
	address?: string;
};

export default function Script({ label, script, address }: Props) {
	if (!script) return null;

	const isFinalWitnessScript = label === "Final witness";
	const scriptType = getScriptType(script, isFinalWitnessScript);
	const parsedScript = parseScript(script, isFinalWitnessScript);

	return (
		<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
			<dt>{label}</dt>
			<dd className="sm:col-span-3 space-y-6">
				<div className="flex flex-col md:flex-row justify-between md:items-center">
					<Badge variant="secondary">{scriptType}</Badge>
					{address && <p className="font-mono">{address}</p>}
				</div>
				<div className="space-y-1 flex flex-col">
					{parsedScript.map((text, idx) => (
						<ScriptText
							// biome-ignore lint/suspicious/noArrayIndexKey: static script parsing
							key={idx}
							label={text}
						/>
					))}
				</div>
			</dd>
		</div>
	);
}

const parseScript = (
	script: Exclude<Props["script"], undefined>,
	isFinalWitness: boolean,
): string[] =>
	Match.value(isFinalWitness).pipe(
		Match.when(true, () => extractWitnessStack(script)),
		Match.when(false, () => bjsScript.toASM(script).split(" ")),
		Match.exhaustive,
	);
