// MenuSection.tsx
import type { MenuSection } from "../../types";
import styles from "./MenuSectionItem.module.css";
import { SortableItemWrapper } from "../SortableItemWrapper.tsx/SortableItemWrapper";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useState } from "react";
import ModalEditVariants from "../ModalEditVariants/ModalEditVariants";
import ModalMenuSectionEdit from "../ModalMenuSectionEdit/ModalMenuSectionEdit";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import { useDishesContext } from "../../context/DishesContext/DishesContext";

export function MenuSectionItem({
	section,
	isSorting,
}: {
	section: MenuSection;
	isSorting: boolean;
}) {
	// State to control the section edit modal
	const [isSectionEditOpen, setIsSectionEditOpen] = useState(false);
	// Get context values and functions for sections
	const { selectedSectionId, setSelectedSectionId, deleteSection } =
		useSectionsContext();
	// Get context function to update dishes
	const { setDishes } = useDishesContext();
	// Check if the current section is selected
	const isSelected = section.id === selectedSectionId;

	// Handles the click on a section to set it as selected
	const handleSectionClick = () => {
		setSelectedSectionId(section.id);
	};

	// Handles the deletion of a section and its associated dishes
	const handleSectionDelete = () => {
		deleteSection(section.id);
		// Filter out dishes belonging to the deleted section
		setDishes(prev => prev.filter(dish => dish.sectionId !== section.id));
	};

	// Opens the modal for editing the section
	const handleEdit = () => {
		setIsSectionEditOpen(true);
	};

	// Get template styles from context
	const { template } = useMenuTemplate();

	// JSX for the section card
	const SectionCard = (
		<div className={`${styles.menuSectionCard} ${template.navigationSection}`}>
			{/* Display the section name */}
			<span className={`menuSpan ${styles.sectionName}`}>{section.name}</span>
			{/* Component for editing and deleting the section */}
			<ModalEditVariants onDelete={handleSectionDelete} onEdit={handleEdit} />
		</div>
	);

	return (
		<div
			className={`${styles.menuSectionItem} ${
				isSelected && !isSorting ? styles.selected : ""
			} `}
			onClick={handleSectionClick}
		>
			{/* Wrap the section card with SortableItemWrapper if sorting is enabled */}
			{isSorting ? (
				<SortableItemWrapper
					id={section.id}
					data={{ group: "sections", type: "section" }}
				>
					{SectionCard}
				</SortableItemWrapper>
			) : (
				SectionCard
			)}

			{/* Render the section edit modal if it's open */}
			{isSectionEditOpen && (
				<ModalMenuSectionEdit
					section={section}
					modalStateSetter={setIsSectionEditOpen}
				/>
			)}
		</div>
	);
}
