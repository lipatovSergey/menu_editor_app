import { createContext, useContext, Dispatch, SetStateAction } from "react";
import type { MenuSection } from "../../types";
/**
 * Defines the shape of the sections context.
 * Contains all the state and methods needed for sections management.
 */
interface SectionsContextProvider {
	// Array of menu sections
	sections: MenuSection[];
	// Function to update the sections array
	setSections: Dispatch<SetStateAction<MenuSection[]>>;
	// ID of the current selected section
	selectedSectionId: MenuSection["id"];
	// Function to update selected section ID
	setSelectedSectionId: Dispatch<SetStateAction<string>>;
	// Function to add a new section
	addSection: () => void;
	/**
	 * Updates a menu section's data
	 * @param {string} id - ID of section to update
	 * @param {Partial<MenuSection>} updatedData - Partial section object with new values
	 */
	updateSection: (
		id: MenuSection["id"],
		updatedData: Partial<MenuSection>
	) => void;
	/**
	 * Deletes a menu section by ID
	 * @param {string} id - ID for section to delete
	 */
	deleteSection: (id: MenuSection["id"]) => void;
}

/**
 * The context instance that will hold all section-related data and methods
 * Initialized as undefined - must be used within a SectionProvider
 */
export const SectionsContext = createContext<
	SectionsContextProvider | undefined
>(undefined);

/**
 * Custom hook for accessing the sections context
 * @returns The sections context object
 * @throws Error if used outside of a SectionProvider
 */
export const useSectionsContext = () => {
	const context = useContext(SectionsContext);
	if (!context) {
		throw new Error("useSectionsContext must be used within SectionsProvider");
	}
	return context;
};
