export interface Dish {
	id: string;
	sectionId: string;
	name: string;
	description: string;
}

export interface MenuSection {
	id: string;
	name: string;
}

export type CssModule = { [key: string]: string };

export type TemplateName = "dark" | "classic" | "blue" | "orange" | "green";
