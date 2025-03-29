import { useState, ReactNode } from "react";
import { SortingContext } from "./SortingContext";

type SortingProviderProps = {
	children: ReactNode;
};

export const SortingProvider = ({ children }: SortingProviderProps) => {
	const [activeSorting, setActiveSorting] = useState<string | null>(null);

	return (
		<SortingContext.Provider value={{ activeSorting, setActiveSorting }}>
			{children}
		</SortingContext.Provider>
	);
};
