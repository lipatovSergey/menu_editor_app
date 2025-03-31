import { useState } from "react";
import styles from "./ModalEditVariants.module.css";

const ModalEditVariants = ({
	onDelete,
	onEdit,
}: {
	onDelete: () => void;
	onEdit?: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const handleEdit = () => {
		if (onEdit) onEdit();
		setIsOpen(false);
	};
	const handleDeleteClick = () => {
		const shouldProceed = confirm(
			"Are you sure you want to delete this element?"
		);
		if (shouldProceed) onDelete();
	};

	if (!isOpen)
		return (
			<button className={styles.editBtn} onClick={handleOpen}>
				E
			</button>
		);

	return (
		<>
			<button className={styles.editBtn} onClick={handleOpen}>
				E
			</button>
			<div className={styles.modalOverlay}>
				<div className={styles.modal}>
					<button onClick={handleEdit}>Edit</button>
					<button onClick={handleDeleteClick}>Delete</button>
					<button onClick={handleClose}>Close</button>
				</div>
			</div>
		</>
	);
};

export default ModalEditVariants;
