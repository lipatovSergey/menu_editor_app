import { DishCard } from "../DishCard/DishCard";
import styles from "./DishList.module.css";
import { useSorting } from "../../context/SortingContext/SortingContext";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useDishesContext } from "../../context/DishesContext/DishesContext";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import SortButton from "../SortButton/SortButton";

export default function DishesList() {
	const { dishes, addDish } = useDishesContext();
	const { activeSorting } = useSorting();
	const { template } = useMenuTemplate();
	const { selectedSectionId } = useSectionsContext();
	const isSorting = activeSorting === "dishes";

	console.log(activeSorting);

	return (
		<div className={`${template.menu} ${styles.wrapper}`}>
			<button onClick={addDish}>Add</button>
			<SortButton listToSort={"dishes"} active={isSorting} />
			<div className={styles.wrapper}>
				<div
					className={styles.dishList}
					style={{
						touchAction: isSorting ? "none" : "auto",
					}}
				>
					{dishes.map(
						dish =>
							dish.sectionId === selectedSectionId && (
								<DishCard key={dish.id} dish={dish} isSorting={isSorting} />
							)
					)}
				</div>
			</div>
		</div>
	);
}
