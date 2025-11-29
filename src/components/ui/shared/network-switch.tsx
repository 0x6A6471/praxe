import { networks } from "bitcoinjs-lib";

import useDisplay from "@/hooks/useDisplay";
import Label from "../core/label";
import Switch from "../core/switch";

export default function NetworkSwitch() {
	const { network, toggleNetwork } = useDisplay();
	const isMainnet = network === networks.bitcoin;

	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="network"
				checked={isMainnet}
				onCheckedChange={toggleNetwork}
			/>
			<Label htmlFor="network" className="w-14 text-right font-normal">
				{isMainnet ? "Mainnet" : "Testnet"}
			</Label>
		</div>
	);
}
