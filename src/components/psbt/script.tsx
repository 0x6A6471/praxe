import { script as bjsScript } from "bitcoinjs-lib";
import { Match } from "effect";

import ScriptText from "@/components/script-text";
import Badge from "@/components/ui/core/badge";
import { extractWitnessStack, getScriptType } from "@/utils/bitcoin";

type Label =
	| "Final witness"
	| "Redeem script"
	| "Unlock script"
	| "Witness script";

type Props = {
	label: Label;
	script: Uint8Array | Uint8Array<ArrayBufferLike>[] | undefined;
	address?: string;
	outputScript?: Uint8Array;
};
export default function Script({
	label,
	script,
	address,
	outputScript,
}: Props) {
	if (!script || script.length === 0) return null;

	const isWitnessArray = Array.isArray(script);
	const isWitness =
		label === "Final witness" ||
		// handles psbt vs transaction "Witness script" label
		(Array.isArray(script) && label === "Witness script");
	const isUnlock = label === "Unlock script";
	const type = getScriptType(
		script as Uint8Array,
		isWitness,
		isUnlock,
		outputScript,
	);

	const parsed = parseScript(script, isWitness || isWitnessArray);
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
	isWitness: boolean,
): string[] => {
	if (Array.isArray(script)) {
		return script.map((buf) =>
			Array.from(buf)
				.map((b) => b.toString(16).padStart(2, "0"))
				.join(""),
		);
	}
	return Match.value(isWitness).pipe(
		Match.when(true, () => extractWitnessStack(script)),
		Match.when(false, () => bjsScript.toASM(script).split(" ")),
		Match.exhaustive,
	);
};
