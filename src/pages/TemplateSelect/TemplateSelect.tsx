import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { Link } from "react-router-dom";
import styles from "./TemplateSelect.module.css";
import { useState, useEffect } from "react";
import type { TemplateName } from "../../types";
const templates: TemplateName[] = [
	"classic",
	"dark",
	"blue",
	"orange",
	"green",
];

const TemplateSelect = () => {
	const { template, changeTemplate } = useMenuTemplate();
	console.log(template);
	const [activeTemplate, setActiveTemplate] = useState<
		TemplateName | undefined
	>(undefined);
	useEffect(() => {
		const selectedTemplate = localStorage.getItem(
			"selectedTemplate"
		) as TemplateName;
		if (selectedTemplate) {
			setActiveTemplate(selectedTemplate);
			changeTemplate(selectedTemplate);
		}
	}, [changeTemplate]);

	const handleTemplateBtnClick = (name: TemplateName) => {
		changeTemplate(name);
		setActiveTemplate(name);
		localStorage.setItem("selectedTemplate", name);
	};

	return (
		<div className={styles.templatesPage}>
			{templates.map(template => (
				<button
					key={template}
					className={`${styles.templateBtn} ${
						activeTemplate === template ? styles.active : ""
					}`}
					onClick={() => handleTemplateBtnClick(template)}
				>
					{template}
				</button>
			))}

			<Link className={styles.menuEditorBtn} to={"/menu_editor"}>
				start
			</Link>
		</div>
	);
};

export default TemplateSelect;
