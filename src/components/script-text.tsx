import { Match } from "effect";

import Badge from "@/components/ui/core/badge";
import { isOpCode } from "@/utils/bitcoin";

export default function ScriptTest({ label }: { label: string }) {
	return Match.value(isOpCode(label)).pipe(
		Match.when(true, () => <Badge>{label}</Badge>),
		Match.when(false, () => <p className="font-mono">{label}</p>),
		Match.exhaustive,
	);
}
