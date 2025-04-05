import { DishCard } from "../DishCard/DishCard";
import styles from "./DishList.module.css";
import { useSorting } from "../../context/SortingContext/SortingContext";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useDishesContext } from "../../context/DishesContext/DishesContext";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import SortButton from "../SortButton/SortButton";

export default function DishesList() {
	// Get dishes and addDish function from context
	const { dishes, addDish } = useDishesContext();
	// Get active sorting state
	const { activeSorting } = useSorting();
	// Get menu template styles
	const { template } = useMenuTemplate();
	// Get the currently selected section ID
	const { selectedSectionId } = useSectionsContext();
	// Determine if dish sorting is active
	const isSorting = activeSorting === "dishes";

	console.log(activeSorting);

	return (
		<div className={`${template.menu} ${styles.dishes}`}>
			<div className={styles.btnWrapper}>
				{/* Button to add a new dish */}
				<button onClick={addDish}>Add</button>
				{/* Button to toggle dish sorting */}
				<SortButton listToSort={"dishes"} active={isSorting} />
			</div>
			<div
				className={styles.dishList}
				// Disable touch scrolling on the list when sorting is active for drag and drop
				style={{
					touchAction: isSorting ? "none" : "auto",
				}}
			>
				{/* Map through dishes and render DishCard for those in the selected section */}
				{dishes.map(
					dish =>
						dish.sectionId === selectedSectionId && (
							<DishCard key={dish.id} dish={dish} isSorting={isSorting} />
						)
				)}
			</div>
		</div>
	);
}
