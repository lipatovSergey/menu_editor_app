import type { MenuSection } from "../../types";
import styles from "./ModalMenuSectionEdit.module.css";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import { useState, useRef, useEffect } from "react";

const ModalMenuSectionEdit = ({
	section,
	modalStateSetter,
}: {
	section: MenuSection;
	modalStateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// Ref for the textarea element
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	// Get the updateSection function from the sections context
	const { updateSection } = useSectionsContext();
	// State to manage the section name input value
	const [sectionName, setSectionName] = useState(section.name);

	// Focus and set cursor at the end of the text in the textarea on mount
	useEffect(() => {
		if (textareaRef.current) {
			const length = textareaRef.current.value.length;
			textareaRef.current.setSelectionRange(length, length);
			textareaRef.current.focus();
		}
	}, []);

	// Handles changes to the textarea input
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSectionName(e.target.value);
	};

	// Handles saving the edited section name
	const handleSaveBtn = () => {
		updateSection(section.id, { name: sectionName });
		modalStateSetter(false); // Close the modal
	};

	// Handles canceling the edit and closing the modal
	const handleCancelBtn = () => {
		modalStateSetter(false); // Close the modal
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<textarea
					id={`sectionName-${section.id}`}
					name='sectionName'
					ref={textareaRef}
					value={sectionName}
					onChange={handleChange}
					autoFocus // Initially focus the textarea (though useEffect also handles this)
					className={styles.textarea}
				/>
				<button onClick={handleSaveBtn}>save</button>
				<button onClick={handleCancelBtn}>cancel</button>
			</div>
		</div>
	);
};

export default ModalMenuSectionEdit;
