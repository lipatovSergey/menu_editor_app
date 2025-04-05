import type { Dish } from "../../types";
import styles from "./DishCard.module.css";
import { SortableItemWrapper } from "../SortableItemWrapper.tsx/SortableItemWrapper";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useState } from "react";
import ModalEditVariants from "../ModalEditVariants/ModalEditVariants";
import { useDishesContext } from "../../context/DishesContext/DishesContext";
import ModalDishEdit from "../ModalDishEdit/ModalDishEdit";

export function DishCard({
	dish,
	isSorting,
}: {
	dish: Dish;
	isSorting: boolean;
}) {
	// Get template styles from context
	const { template } = useMenuTemplate();
	// State to control the edit dish modal
	const [isDishEditOpen, setIsDishEditOpen] = useState(false);
	// Get the delete dish function from context
	const { deleteDish } = useDishesContext();

	// JSX for the dish card
	const dishCard = (
		<div className={`${styles.dishCard} ${template.dishCard}`}>
			{/* Display dish name */}
			<span className={template.dishCardName}>{dish.name}</span>
			{/* Display dish description */}
			<span className={template.dishCardDescription}>{dish.description}</span>
			{/* Component for editing/deleting dish variants */}
			<ModalEditVariants
				// Callback to delete the current dish
				onDelete={() => deleteDish(dish.id)}
				// Callback to open the dish edit modal
				onEdit={() => setIsDishEditOpen(true)}
			/>
		</div>
	);

	return (
		<div className={styles.dishItem}>
			{/* Wrap with SortableItemWrapper if sorting is enabled */}
			{isSorting ? (
				<SortableItemWrapper
					id={dish.id}
					data={{ group: "dishes", type: "dish" }}
				>
					{dishCard}
				</SortableItemWrapper>
			) : (
				dishCard
			)}

			{/* Render the dish edit modal if it's open */}
			{isDishEditOpen && (
				<ModalDishEdit dish={dish} modalStateSetter={setIsDishEditOpen} />
			)}
		</div>
	);
}
