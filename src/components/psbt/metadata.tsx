import Icon from "@/components/ui/icon";
import type { ParsedPsbt } from "@/services/psbt";

type Props = {
	version: ParsedPsbt["version"];
	locktime: ParsedPsbt["locktime"];
};

export default function Metadata({ version, locktime }: Props) {
	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name="brackets" /> <span>Metadata</span>
				</h2>
			</div>
			<ul className="space-y-4">
				<li className="rounded-xl bg-background flex flex-col">
					<dl className="divide-y divide-border">
						<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words">
							<dt className="text-muted-foreground">Version</dt>
							<dd className="sm:col-span-3 font-mono">{version}</dd>
						</div>
						<div className="p-4 sm:grid sm:grid-cols-4 sm:gap-4">
							<dt className="text-muted-foreground">Locktime</dt>
							<dd className="sm:col-span-3">{locktime}</dd>
						</div>
					</dl>
				</li>
			</ul>
		</div>
	);
}
