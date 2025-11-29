import { script as bjsScript } from "bitcoinjs-lib";
import { Match } from "effect";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/core/badge";
import { extractWitnessStack, getScriptType } from "@/utils/bitcoin";

type Props = {
	label: string;
	script: Uint8Array | undefined;
	address?: string;
	outputScript?: Uint8Array;
};
export default function Script({
	label,
	script,
	address,
	outputScript,
}: Props) {
	if (!script) return null;
	const isWitnessArray = Array.isArray(script);
	const isFinalWitness =
		label.toLowerCase().includes("final") ||
		label.toLowerCase().includes("witness");
	const isUnlock = label.toLowerCase().includes("unlock");
	const type = isWitnessArray
		? "witness"
		: getScriptType(
				script as Uint8Array,
				isFinalWitness,
				isUnlock,
				outputScript,
			);

	const parsed = parseScript(script, isFinalWitness || isWitnessArray);
	return (
		<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
			<dt className="flex gap-x-1 sm:flex-col text-muted-foreground">
				<p>{label}</p>
				<Badge variant="secondary" className="text-muted-foreground">
					{type}
				</Badge>
			</dt>
			<dd className="sm:col-span-3">
				{address && <p className="font-mono mb-6">{address}</p>}
				<div className="space-y-1 flex flex-col">
					{parsed.map((text, idx) => (
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
): string[] => {
	return Match.value(isFinalWitness).pipe(
		Match.when(true, () => extractWitnessStack(script)),
		Match.when(false, () => bjsScript.toASM(script).split(" ")),
		Match.exhaustive,
	);
};
