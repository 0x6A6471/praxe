import { useContext } from "react";

import { DisplayContext } from "../context/display";

export default function useDisplay() {
	const context = useContext(DisplayContext);

	if (context === undefined) {
		throw new Error("useDisplay must be used within a DisplayProvider");
	}

	return context;
}
