import { Match } from "effect";

import Badge from "@/components/ui/badge";
import { isOpCode } from "@/utils/bitcoin";

export default function ScriptTest({ label }: { label: string }) {
	return Match.value(isOpCode(label)).pipe(
		Match.when(true, () => <Badge variant="secondary">{label}</Badge>),
		Match.when(false, () => <p className="font-mono">{label}</p>),
		Match.exhaustive,
	);
}
