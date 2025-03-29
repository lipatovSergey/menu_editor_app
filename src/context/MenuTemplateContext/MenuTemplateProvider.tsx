import { useState, ReactNode } from "react";
import { MenuTemplateContext } from "./MenuTemplateContext";
import type { CssModule } from "../../types";

import dark from "@/styles/menuStyles/dark.module.css";
import classic from "@/styles/menuStyles/classic.module.css";
import green from "@/styles/menuStyles/green.module.css";
import blue from "@/styles/menuStyles/blue.module.css";
import orange from "@/styles/menuStyles/orange.module.css";

type MenuTemplateProviderProps = {
	children: ReactNode;
};

export const MenuTemplateProvider = ({
	children,
}: MenuTemplateProviderProps) => {
	const [template, setTemplate] = useState<CssModule>(classic);

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

	return (
		<MenuTemplateContext.Provider value={{ template, changeTemplate }}>
			{children}
		</MenuTemplateContext.Provider>
	);
};
