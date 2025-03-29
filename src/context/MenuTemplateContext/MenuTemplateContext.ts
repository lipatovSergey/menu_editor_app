import { createContext, useContext } from "react";
import { CssModule } from "../../types";
import classic from "@/styles/menuStyles/classic.module.css";

type MenuTemplateContextType = {
	template: CssModule;
	changeTemplate: (
		styleName: "dark" | "classic" | "blue" | "orange" | "green"
	) => void;
};

export const MenuTemplateContext = createContext<MenuTemplateContextType>({
	template: classic,
	changeTemplate: () => {},
});

export const useMenuTemplate = () => {
	const context = useContext(MenuTemplateContext);
	if (!context) {
		throw new Error("useMenuTemplate must be used within MenuTemplateProvider");
	}
	return context;
};
