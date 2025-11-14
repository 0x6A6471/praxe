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

export default function DisplayProvider({ children }: { children: ReactNode }) {
	const initialNetwork: Network = Match.value(
		localStorage.getItem("network"),
	).pipe(
		Match.when("mainnet", () => "mainnet" as const),
		Match.orElse(() => "testnet" as const),
	);
	const initialUnit: Unit = Match.value(localStorage.getItem("unit")).pipe(
		Match.when("btc", () => "btc" as const),
		Match.orElse(() => "sats" as const),
	);
	const [network, setNetwork] = useState<Network>(initialNetwork);
	const [unit, setUnit] = useState<Unit>(initialUnit);

	useEffect(() => {
		localStorage.setItem("unit", unit);
	}, [unit]);

	useEffect(() => {
		if (!localStorage.getItem("network")) {
			localStorage.setItem("network", "testnet");
		}
	}, []);

	function toggleNetwork() {
		Match.value(network).pipe(
			Match.when("testnet", () => {
				localStorage.setItem("network", "mainnet");
				setNetwork("mainnet");
			}),
			Match.when("mainnet", () => {
				localStorage.setItem("network", "testnet");
				setNetwork("testnet");
			}),
			Match.exhaustive,
		);
	}

	return (
		<DisplayContext.Provider
			value={{
				network,
				toggleNetwork,
				unit,
				setUnit,
			}}
		>
			{children}
		</DisplayContext.Provider>
	);
}
