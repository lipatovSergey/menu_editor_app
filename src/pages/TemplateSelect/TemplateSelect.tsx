import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { Link } from "react-router-dom";
import styles from "./TemplateSelect.module.css";
import { useState, useEffect } from "react";
import type { TemplateName } from "../../types";

/**
 * An array of available menu template names.
 */
const templates: TemplateName[] = [
  "classic",
  "dark",
  "blue",
  "orange",
  "green",
];

/**
 * Component that allows the user to select a menu template.
 */
const TemplateSelect = () => {
  /**
   * Accesses the current menu template and the function to change it from the context.
   */
  const { template, changeTemplate } = useMenuTemplate();
  console.log(template);

  /**
   * State to keep track of the currently active template selected by the user.
   */
  const [activeTemplate, setActiveTemplate] = useState<
    TemplateName | undefined
  >(undefined);

  /**
   * useEffect hook to load the previously selected template from local storage on component mount.
   */
  useEffect(() => {
    const selectedTemplate = localStorage.getItem(
      "selectedTemplate"
    ) as TemplateName;
    if (selectedTemplate) {
      setActiveTemplate(selectedTemplate);
      changeTemplate(selectedTemplate);
    }
  }, [changeTemplate]); // Depend on changeTemplate to avoid potential stale closure issues

  /**
   * Handles the click event when a template button is clicked.
   * Updates the active template in the state, context, and local storage.
   * @param name The name of the clicked template.
   */
  const handleTemplateBtnClick = (name: TemplateName) => {
    changeTemplate(name);
    setActiveTemplate(name);
    localStorage.setItem("selectedTemplate", name);
  };

  return (
    <div className={styles.templatesPage}>
      {/**
       * Maps through the templates array and renders a button for each template.
       */}
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

      {/**
       * Link to navigate to the menu editor page.
       */}
      <Link className={styles.menuEditorBtn} to={"/menu_editor"}>
        start
      </Link>
    </div>
  );
};

export default TemplateSelect;