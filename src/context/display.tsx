import { createContext, type ReactNode, useEffect, useState } from "react";
import { type Network, networks } from "bitcoinjs-lib";
import { Match } from "effect";

type Unit = "btc" | "sats";
type NetworkName = "bitcoin" | "testnet";

type DisplayContextValue = {
	network: Network;
	toggleNetwork: () => void;
	unit: Unit;
	setUnit: (unit: Unit) => void;
};

export const DisplayContext = createContext<DisplayContextValue>({
	network: networks.testnet,
	toggleNetwork: () => {},
	unit: "sats",
	setUnit: () => {},
});

function persistNetwork(
	networkName: NetworkName,
	setter: (value: Network) => void,
) {
	localStorage.setItem("network", networkName);
	setter(networkName === "bitcoin" ? networks.bitcoin : networks.testnet);
}

function persistUnit(unit: Unit, setter: (value: Unit) => void) {
	localStorage.setItem("unit", unit);
	setter(unit);
}

export default function DisplayProvider({ children }: { children: ReactNode }) {
	const [network, setNetwork] = useState<Network>(networks.testnet);
	const [unit, setUnit] = useState<Unit>("sats");

	useEffect(() => {
		const storedNetworkName = Match.value(localStorage.getItem("network")).pipe(
			Match.when("bitcoin", () => "bitcoin" as const),
			Match.orElse(() => "testnet" as const),
		);
		const storedUnit = Match.value(localStorage.getItem("unit")).pipe(
			Match.when("btc", () => "btc" as const),
			Match.orElse(() => "sats" as const),
		);

		persistNetwork(storedNetworkName, setNetwork);
		persistUnit(storedUnit, setUnit);
	}, []);

	function toggleNetwork() {
		const newNetworkName: NetworkName =
			network === networks.testnet ? "bitcoin" : "testnet";
		persistNetwork(newNetworkName, setNetwork);
	}

	function handleSetUnit(unit: Unit) {
		persistUnit(unit, setUnit);
	}

	return (
		<DisplayContext.Provider
			value={{
				network,
				toggleNetwork,
				unit,
				setUnit: handleSetUnit,
			}}
		>
			{children}
		</DisplayContext.Provider>
	);
}
