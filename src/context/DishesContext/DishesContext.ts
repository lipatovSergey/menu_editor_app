import { createContext, useContext, Dispatch, SetStateAction } from "react";
import type { Dish } from "../../types";

interface DishesContextProps {
	dishes: Dish[];
	setDishes: Dispatch<SetStateAction<Dish[]>>;
	addDish: () => void;
	updateDish: (id: Dish["id"], updatedData: Partial<Dish>) => void;
	deleteDish: (id: Dish["id"]) => void;
}

export const DishesContext = createContext<DishesContextProps | undefined>(
	undefined
);

export const useDishesContext = () => {
	const context = useContext(DishesContext);
	if (!context) {
		throw new Error("useDishesContext must be used within DishesProvider");
	}
	return context;
};
