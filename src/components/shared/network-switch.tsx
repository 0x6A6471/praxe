import Label from "@/components/ui/label";
import Switch from "@/components/ui/switch";
import useDisplay from "@/hooks/useDisplay";

export default function NetworkSwitch() {
	const { network, toggleNetwork } = useDisplay();

	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="network"
				checked={network === "mainnet"}
				onCheckedChange={toggleNetwork}
			/>
			<Label htmlFor="network" className="w-14 text-right font-normal">
				{network === "mainnet" ? "Mainnet" : "Testnet"}
			</Label>
		</div>
	);
}
