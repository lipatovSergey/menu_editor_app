import { createContext, useContext, Dispatch, SetStateAction } from "react";
import type { MenuSection } from "../../types";

interface SectionsContextProvider {
	sections: MenuSection[];
	setSections: Dispatch<SetStateAction<MenuSection[]>>;
	selectedSectionId: MenuSection["id"];
	setSelectedSectionId: Dispatch<SetStateAction<string>>;
	addSection: () => void;
	updateSection: (
		id: MenuSection["id"],
		updatedData: Partial<MenuSection>
	) => void;
	deleteSection: (id: MenuSection["id"]) => void;
}

export const SectionsContext = createContext<
	SectionsContextProvider | undefined
>(undefined);

export const useSectionsContext = () => {
	const context = useContext(SectionsContext);
	if (!context) {
		throw new Error("useSectionsContext must be used within SectionsProvider");
	}
	return context;
};
