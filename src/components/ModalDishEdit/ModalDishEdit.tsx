import type { Dish } from "../../types";
import styles from "./ModalDishEdit.module.css";
import { useDishesContext } from "../../context/DishesContext/DishesContext";
import { useState, useRef } from "react";

const ModalDishEdit = ({
	dish,
	modalStateSetter,
}: {
	dish: Dish;
	modalStateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// Get the updateDish function from the dishes context
	const { updateDish } = useDishesContext();
	// State to manage the dish name input value
	const [dishName, setDishName] = useState(dish.name);
	// State to manage the dish description input value
	const [dishDescription, setDishDescription] = useState(dish.description);
	// State to track the currently focused text area
	const [activeField, setActiveField] = useState<string | null>(null);

	// Refs for the name and description text areas
	const fieldsRefs = {
		name: useRef<HTMLTextAreaElement>(null),
		description: useRef<HTMLTextAreaElement>(null),
	};

	// Handles clicking on a text area to focus and set the cursor at the end
	const handleFieldClick = (fieldName: keyof typeof fieldsRefs) => {
		const textarea = fieldsRefs[fieldName].current;
		if (!textarea) return;
		const length = textarea.value.length;
		textarea.setSelectionRange(length, length);
		setActiveField(fieldName);
	};

	// Handles saving the edited dish details
	const handleSaveBtn = () => {
		updateDish(dish.id, { name: dishName, description: dishDescription });
		modalStateSetter(false); // Close the modal
	};

	// Handles canceling the edit and closing the modal
	const handleCancelBtn = () => {
		modalStateSetter(false); // Close the modal
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div className={styles.formGroup}>
					<textarea
						id={`dishName-${dish.id}`}
						name='sectionName'
						ref={fieldsRefs.name}
						value={dishName}
						onChange={e => setDishName(e.target.value)}
						onClick={() => handleFieldClick("name")}
						className={`${styles.textarea} ${
							activeField === "name" ? styles.activeField : ""
						}`}
						rows={1}
					/>
				</div>
				<div className={styles.formGroup}>
					<textarea
						id={`dishDescription-${dish.id}`}
						name='dishDescription'
						ref={fieldsRefs.description}
						value={dishDescription}
						onChange={e => setDishDescription(e.target.value)}
						onClick={() => handleFieldClick("description")}
						className={`${styles.textarea} ${
							activeField === "description" ? styles.activeField : ""
						}`}
					/>
				</div>
				<button onClick={handleSaveBtn}>save</button>
				<button onClick={handleCancelBtn}>cancel</button>
			</div>
		</div>
	);
};

export default ModalDishEdit;
