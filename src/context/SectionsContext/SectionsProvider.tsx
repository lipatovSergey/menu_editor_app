import { v4 as uuidv4 } from "uuid";
import { useState, ReactNode, useEffect } from "react";
import { SectionsContext } from "./SectionsContext";
import type { MenuSection } from "../../types";

type SectionsProviderProps = {
	children: ReactNode;
};

export const SectionsProvider = ({ children }: SectionsProviderProps) => {
	const [selectedSectionId, setSelectedSectionId] = useState<string>(() => {
		const savedSelectedSection = localStorage.getItem("selectedSectionId");
		return savedSelectedSection ? JSON.parse(savedSelectedSection) : uuidv4();
	});
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

	useEffect(() => {
		localStorage.setItem("sections", JSON.stringify(sections));
		localStorage.setItem(
			"selectedSectionId",
			JSON.stringify(selectedSectionId)
		);
	}, [sections, selectedSectionId]);

	const addSection = () => {
		setSections([{ id: uuidv4(), name: "New Section" }, ...sections]);
	};

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

	const deleteSection = (id: MenuSection["id"]) => {
		setSections(prev => prev.filter(section => section.id !== id));
	};

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
