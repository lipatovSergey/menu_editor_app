import { useSorting } from "../../context/SortingContext/SortingContext";
import styles from "./SortButton.module.css";

type listToSortType = "dishes" | "sections" | null;

const SortButton = ({
	listToSort,
	active,
}: {
	listToSort: listToSortType;
	active: boolean;
}) => {
	// Get the active sorting state and setter from context
	const { activeSorting, setActiveSorting } = useSorting();

	// Handles the click on the sort button
	const handleSortBtnClick = () => {
		// If the current sorting is for this list, deactivate sorting
		if (activeSorting === listToSort) {
			setActiveSorting(null);
		}
		// Otherwise, activate sorting for this list
		else {
			setActiveSorting(listToSort);
		}
	};

	return (
		<button
			// Apply active style if this list is currently being sorted
			className={`${styles.sortBtn} ${active ? styles.active : ""}`}
			onClick={handleSortBtnClick}
		>
			Sort
		</button>
	);
};

export default SortButton;
