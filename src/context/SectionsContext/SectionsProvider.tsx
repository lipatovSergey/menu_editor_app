import { v4 as uuidv4 } from "uuid";
import { useState, ReactNode, useEffect } from "react";
import { SectionsContext } from "./SectionsContext";
import type { MenuSection } from "../../types";

/**
 * Props for SectionProvider
 * @property {ReactNode} children - Child component that will have acess to the context
 */
type SectionsProviderProps = {
	children: ReactNode;
};

/**
 * Context provider for managing menu sections.
 * Handles sections operations (add, update, delete),
 * persists state to localStorage, and synchronizes it across sessions
 */
export const SectionsProvider = ({ children }: SectionsProviderProps) => {
	// State for storing the currently selected section ID
	// On initialization, tries to load from localStorage, otherwise generates a new UID
	const [selectedSectionId, setSelectedSectionId] = useState<string>(() => {
		const savedSelectedSection = localStorage.getItem("selectedSectionId");
		return savedSelectedSection ? JSON.parse(savedSelectedSection) : uuidv4();
	});
	// State for storing the list of menu sections
	// On initialization, tries to load from localStorage, otherwise creates a default section
	const [sections, setSections] = useState<MenuSection[]>(() => {
		const savedSections = localStorage.getItem("sections");
		return savedSections
			? JSON.parse(savedSections)
			: [
					{
						id: selectedSectionId,
						name: "New Section",
					},
			  ];
	});

	// Effect for persisting sections  and selected section to localStorage
	// Triggers on any changes to sections or selectedSectionId
	useEffect(() => {
		localStorage.setItem("sections", JSON.stringify(sections));
		localStorage.setItem(
			"selectedSectionId",
			JSON.stringify(selectedSectionId)
		);
	}, [sections, selectedSectionId]);

	/**
	 * Adds a new section.
	 * The new section is prepended to the list with an auto-generated ID
	 * and default name "New Section"
	 */
	const addSection = () => {
		setSections([{ id: uuidv4(), name: "New Section" }, ...sections]);
	};

	/**
	 * Updates a menu section's data
	 * @param {string} id - ID of section to update
	 * @param {Partial<MenuSection>} updatedData - Partial section object with new values
	 */
	const updateSection = (
		id: MenuSection["id"],
		updatedData: Partial<MenuSection>
	) => {
		setSections(prev =>
			prev.map(section =>
				section.id === id ? { ...section, ...updatedData } : section
			)
		);
	};

	/**
	 * Deletes a menu section by ID
	 * @param {string} id - ID for section to delete
	 */
	const deleteSection = (id: MenuSection["id"]) => {
		setSections(prev => prev.filter(section => section.id !== id));
	};

	// Providing the context with current state and section management methods
	return (
		<SectionsContext.Provider
			value={{
				sections,
				setSections,
				selectedSectionId,
				setSelectedSectionId,
				addSection,
				updateSection,
				deleteSection,
			}}
		>
			{children}
		</SectionsContext.Provider>
	);
};
