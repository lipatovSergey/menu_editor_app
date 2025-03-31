import { createContext, useContext, Dispatch, SetStateAction } from "react";
import type { Dish } from "../../types";

/**
 * Interface for the DishesContext.
 * Provides the structure for managing dishes and their state.
 */
interface DishesContextProps {
	// Array of dishes
	dishes: Dish[];
	// Function to update the dishes state
	setDishes: Dispatch<SetStateAction<Dish[]>>;
	// Function to add a new dish
	addDish: () => void;
	// Function to update an existing dish
	updateDish: (id: Dish["id"], updatedData: Partial<Dish>) => void;
	// Function to delete a dish by its ID
	deleteDish: (id: Dish["id"]) => void;
}

/**
 * Creates a context for managing dishes.
 * The default value is undefined to ensure it is only used within a provider.
 */
export const DishesContext = createContext<DishesContextProps | undefined>(
	undefined
);

/**
 * Custom hook to access the DishesContext.
 * Ensures the context is used within a DishesProvider.
 * @throws Error if used outside of DishesProvider
 */
export const useDishesContext = () => {
	const context = useContext(DishesContext);
	if (!context) {
		throw new Error("useDishesContext must be used within DishesProvider");
	}
	return context;
};
