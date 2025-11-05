import { Switch } from "@/components/ui/switch";
import Label from "@/components/ui/label";

export default function NetworkSwitch() {
	return (
		<div className="flex items-center space-x-2">
			<Switch id="network" />
			<Label htmlFor="network" className="w-14 text-right">
				Testnet
			</Label>
		</div>
	);
}
