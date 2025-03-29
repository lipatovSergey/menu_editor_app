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
	const [isSectionEditOpen, setIsSectionEditOpen] = useState(false);
	const { selectedSectionId, setSelectedSectionId, deleteSection } =
		useSectionsContext();
	const { setDishes } = useDishesContext();
	const isSelected = section.id === selectedSectionId;

	const handleSectionClick = () => {
		setSelectedSectionId(section.id);
	};

	const handleSectionDelete = () => {
		deleteSection(section.id);
		setDishes(prev => prev.filter(dish => dish.sectionId !== section.id));
	};

	const handleEdit = () => {
		setIsSectionEditOpen(true);
	};

	const { template } = useMenuTemplate();

	const SectionCard = (
		<div className={`${styles.menuSectionCard} ${template.navigationSection}`}>
			<span className={`menuSpan ${styles.sectionName}`}>{section.name}</span>
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

			{isSectionEditOpen && (
				<ModalMenuSectionEdit
					section={section}
					modalStateSetter={setIsSectionEditOpen}
				/>
			)}
		</div>
	);
}
