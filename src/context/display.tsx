import { createContext, type ReactNode, useEffect, useState } from "react";
import { Match } from "effect";

type Network = "mainnet" | "testnet";
type Unit = "btc" | "sats";

type DisplayContextValue = {
	network: Network;
	toggleNetwork: () => void;
	unit: Unit;
	setUnit: (unit: Unit) => void;
};

export const DisplayContext = createContext<DisplayContextValue>({
	network: "testnet",
	toggleNetwork: () => {},
	unit: "sats",
	setUnit: () => {},
});

function persist<T extends Network | Unit>(
	key: "network" | "unit",
	value: T,
	setter: (value: T) => void,
) {
	localStorage.setItem(key, value);
	setter(value);
}

export default function DisplayProvider({ children }: { children: ReactNode }) {
	const [network, setNetwork] = useState<Network>("testnet");
	const [unit, setUnit] = useState<Unit>("sats");

	useEffect(() => {
		const storedNetwork = Match.value(localStorage.getItem("network")).pipe(
			Match.when("mainnet", () => "mainnet" as const),
			Match.orElse(() => "testnet" as const),
		);
		const storedUnit = Match.value(localStorage.getItem("unit")).pipe(
			Match.when("btc", () => "btc" as const),
			Match.orElse(() => "sats" as const),
		);

		persist("network", storedNetwork, setNetwork);
		persist("unit", storedUnit, setUnit);
	}, []);

	function toggleNetwork() {
		Match.value(network).pipe(
			Match.when("testnet", () => {
				persist("network", "mainnet", setNetwork);
			}),
			Match.when("mainnet", () => {
				persist("network", "testnet", setNetwork);
			}),
			Match.exhaustive,
		);
	}

	function handleSetUnit(unit: Unit) {
		setUnit(unit);
		persist("unit", unit, setUnit);
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
