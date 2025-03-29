import { MenuSectionItem } from "../MenuSectionItem/MenuSectionItem";
import styles from "./MenuSections.module.css";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import { useSorting } from "../../context/SortingContext/SortingContext";
import SortButton from "../SortButton/SortButton";

export default function MenuSections() {
	const { sections, addSection } = useSectionsContext();
	const { template } = useMenuTemplate();
	const { activeSorting } = useSorting();
	const isSorting = activeSorting === "sections";

	return (
		<nav className={`${styles.menuSectionsNav}, ${template.navigation}`}>
			<button onClick={addSection}>Add</button>
			<SortButton listToSort={"sections"} active={isSorting} />
			<div className={styles.menuSectionsList}>
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
