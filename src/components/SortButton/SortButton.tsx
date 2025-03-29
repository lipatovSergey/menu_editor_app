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
	const { activeSorting, setActiveSorting } = useSorting();
	const handleSortBtnClick = () => {
		if (activeSorting === listToSort) {
			setActiveSorting(null);
		} else {
			setActiveSorting(listToSort);
		}
	};
	return (
		<button
			className={`${styles.sortBtn} ${active ? styles.active : ""}`}
			onClick={handleSortBtnClick}
		>
			Sort
		</button>
	);
};

export default SortButton;
