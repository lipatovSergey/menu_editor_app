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
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { updateSection } = useSectionsContext();
	const [sectionName, setSectionName] = useState(section.name);

	useEffect(() => {
		// проверка что textareaRef не равен null, тоесть textArea смонтирован
		if (textareaRef.current) {
			const length = textareaRef.current.value.length;
			textareaRef.current.setSelectionRange(length, length);
			textareaRef.current.focus();
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSectionName(e.target.value);
	};

	const handleSaveBtn = () => {
		updateSection(section.id, { name: sectionName });
		modalStateSetter(false);
	};

	const handleCancelBtn = () => {
		modalStateSetter(false);
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
					autoFocus
					className={styles.textarea}
				/>
				<button onClick={handleSaveBtn}>save</button>
				<button onClick={handleCancelBtn}>cancel</button>
			</div>
		</div>
	);
};

export default ModalMenuSectionEdit;
