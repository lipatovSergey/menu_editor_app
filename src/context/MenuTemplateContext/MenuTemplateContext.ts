import { createContext, useContext } from "react";
import { CssModule } from "../../types";
import classic from "@/styles/menuStyles/classic.module.css";

/**
 * Type for the context that stores information about the current menu template.
 */
type MenuTemplateContextType = {
  /**
   * The currently active CSS module for styling the menu.
   */
  template: CssModule;
  /**
   * Function to change the current menu template.
   * @param styleName The name of the style to switch to ("dark", "classic", "blue", "orange", "green").
   */
  changeTemplate: (
    styleName: "dark" | "classic" | "blue" | "orange" | "green"
  ) => void;
};

/**
 * Creates a context to store and manage the menu template.
 * It initializes with the "classic" template by default and an empty function for changing the template.
 */
export const MenuTemplateContext = createContext<MenuTemplateContextType>({
  template: classic,
  changeTemplate: () => {},
});

/**
 * Custom hook to access the value of the MenuTemplateContext.
 * This hook provides a convenient way to get the current template and the function to change it.
 *
 * @returns An object with the current menu template and the function to change it.
 * @throws Error If the hook is called outside of the MenuTemplateProvider.
 */
export const useMenuTemplate = () => {
  const context = useContext(MenuTemplateContext);
  if (!context) {
    throw new Error("useMenuTemplate must be used within MenuTemplateProvider");
  }
  return context;
};