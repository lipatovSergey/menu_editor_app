import { useState, ReactNode } from "react";
import { MenuTemplateContext } from "./MenuTemplateContext";
import type { CssModule } from "../../types";

import dark from "@/styles/menuStyles/dark.module.css";
import classic from "@/styles/menuStyles/classic.module.css";
import green from "@/styles/menuStyles/green.module.css";
import blue from "@/styles/menuStyles/blue.module.css";
import orange from "@/styles/menuStyles/orange.module.css";

/**
 * Type definition for the props of the MenuTemplateProvider component.
 */
type MenuTemplateProviderProps = {
  /**
   * The child elements that will be wrapped by this provider.
   */
  children: ReactNode;
};

/**
 * Provides the MenuTemplateContext to its children.
 * This component manages the current menu template and the function to change it.
 */
export const MenuTemplateProvider = ({
  children,
}: MenuTemplateProviderProps) => {
  /**
   * State to hold the currently active menu template.
   * Defaults to the 'classic' template.
   */
  const [template, setTemplate] = useState<CssModule>(classic);

  /**
   * Function to change the current menu template.
   * Updates the 'template' state based on the provided style name.
   * @param styleName The name of the style to switch to ("dark", "classic", "blue", "orange", "green").
   */
  const changeTemplate = (
    styleName: "dark" | "classic" | "blue" | "orange" | "green"
  ) => {
    switch (styleName) {
      case "dark":
        setTemplate(dark);
        break;
      case "classic":
        setTemplate(classic);
        break;
      case "blue":
        setTemplate(blue);
        break;
      case "orange":
        setTemplate(orange);
        break;
      case "green":
        setTemplate(green);
        break;
      default:
        setTemplate(classic);
    }
  };

  /**
   * Provides the MenuTemplateContext value to all child components.
   * The context value includes the current 'template' and the 'changeTemplate' function.
   */
  return (
    <MenuTemplateContext.Provider value={{ template, changeTemplate }}>
      {children}
    </MenuTemplateContext.Provider>
  );
};