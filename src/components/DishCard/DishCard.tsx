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
	const { template } = useMenuTemplate();
	const [isDishEditOpen, setIsDishEditOpen] = useState(false);
	const { deleteDish } = useDishesContext();

	const dishCard = (
		<div className={`${styles.dishCard} ${template.dishCard}`}>
			<span className={template.dishCardName}>{dish.name}</span>
			<span className={template.dishCardDescription}>{dish.description}</span>
			<ModalEditVariants
				onDelete={() => deleteDish(dish.id)}
				onEdit={() => setIsDishEditOpen(true)}
			/>
		</div>
	);

	return (
		<div className={styles.dishItem}>
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

			{isDishEditOpen && (
				<ModalDishEdit dish={dish} modalStateSetter={setIsDishEditOpen} />
			)}
		</div>
	);
}
