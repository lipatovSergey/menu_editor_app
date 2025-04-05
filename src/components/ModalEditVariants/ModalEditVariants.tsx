import { useState } from "react";
import styles from "./ModalEditVariants.module.css";

const ModalEditVariants = ({
	onDelete,
	onEdit,
}: {
	onDelete: () => void;
	onEdit?: () => void;
}) => {
	// State to control the visibility of the options modal
	const [isOpen, setIsOpen] = useState(false);
	// Opens the options modal
	const handleOpen = () => setIsOpen(true);
	// Closes the options modal
	const handleClose = () => setIsOpen(false);
	// Handles the edit action and closes the modal
	const handleEdit = () => {
		if (onEdit) onEdit();
		setIsOpen(false);
	};
	// Handles the delete action after confirmation
	const handleDeleteClick = () => {
		const shouldProceed = confirm(
			"Are you sure you want to delete this element?"
		);
		if (shouldProceed) onDelete();
	};

	// Render the edit button if the modal is closed
	if (!isOpen)
		return (
			<button className={styles.editBtn} onClick={handleOpen}>
				E
			</button>
		);

	// Render the edit button and the options modal if open
	return (
		<>
			<button className={styles.editBtn} onClick={handleOpen}>
				E
			</button>
			<div className={styles.modalOverlay}>
				<div className={styles.modal}>
					{/* Button to trigger the edit action */}
					<button onClick={handleEdit}>Edit</button>
					{/* Button to trigger the delete action with confirmation */}
					<button onClick={handleDeleteClick}>Delete</button>
					{/* Button to close the options modal */}
					<button onClick={handleClose}>Close</button>
				</div>
			</div>
		</>
	);
};

export default ModalEditVariants;
