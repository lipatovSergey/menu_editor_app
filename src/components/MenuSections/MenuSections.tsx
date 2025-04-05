import { MenuSectionItem } from "../MenuSectionItem/MenuSectionItem";
import styles from "./MenuSections.module.css";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import { useSorting } from "../../context/SortingContext/SortingContext";
import SortButton from "../SortButton/SortButton";

export default function MenuSections() {
	// Get sections and addSection function from context
	const { sections, addSection } = useSectionsContext();
	// Get template styles
	const { template } = useMenuTemplate();
	// Get active sorting state
	const { activeSorting } = useSorting();
	// Determine if section sorting is active
	const isSorting = activeSorting === "sections";

	return (
		<nav className={`${styles.menuSectionsNav} ${template.navigation}`}>
			{/* Button to add a new menu section */}
			<button onClick={addSection}>Add</button>
			{/* Button to toggle sorting for menu sections */}
			<SortButton listToSort={"sections"} active={isSorting} />
			<div className={styles.menuSectionsList}>
				{/* Map through sections and render MenuSectionItem for each */}
				{sections.map(menuSection => (
					<MenuSectionItem
						key={menuSection.id}
						section={menuSection}
						isSorting={isSorting}
					/>
				))}
			</div>
		</nav>
	);
}
