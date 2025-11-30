import Icon from "@/components/ui/core/icon";
import type { IconName } from "@/types/icon";

type Props = {
	iconName: IconName;
	title: string;
	fields: Record<string, string | number>;
};

export default function FieldList({ iconName, title, fields }: Props) {
	return (
		<div>
			<div className="flex items-center justify-between mb-4 ">
				<h2 className="inline-flex items-center gap-x-2 text-lg">
					<Icon name={iconName} /> <span>{title}</span>
				</h2>
			</div>
			<ul className="space-y-4">
				<li className="rounded-xl bg-background flex flex-col">
					<dl className="divide-y divide-border">
						{Object.entries(fields).map(([key, value]) => (
							<div
								key={key}
								className="p-4 sm:grid sm:grid-cols-4 sm:gap-4 break-words"
							>
								<dt className="text-muted-foreground">{key}</dt>
								<dd className="sm:col-span-3 font-mono">{value}</dd>
							</div>
						))}
					</dl>
				</li>
			</ul>
		</div>
	);
}
