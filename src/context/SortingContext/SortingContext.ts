import { createContext, useContext } from "react";

type SortingContextType = {
	activeSorting: string | null;
	setActiveSorting: (id: string | null) => void;
};

export const SortingContext = createContext<SortingContextType>({
	activeSorting: null,
	setActiveSorting: () => {},
});

export const useSorting = () => {
	const context = useContext(SortingContext);
	if (!context) {
		throw new Error("useSorting must be used within SortingProvider");
	}
	return context;
};
