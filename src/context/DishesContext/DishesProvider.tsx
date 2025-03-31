import { v4 as uuidv4 } from "uuid";
import { useState, ReactNode, useEffect } from "react";
import { DishesContext } from "./DishesContext";
import type { Dish } from "../../types";
import { useSectionsContext } from "../SectionsContext/SectionsContext";

type DishesProviderProps = {
	children: ReactNode;
};

/**
 * DishesProvider component.
 * Provides the DishesContext to its children and manages the state of dishes.
 */
export const DishesProvider = ({ children }: DishesProviderProps) => {
	// Access the selected section ID from the SectionsContext
	const { selectedSectionId } = useSectionsContext();

	/**
	 * State for storing the list of dishes.
	 * Initializes from localStorage if available, otherwise creates a default dish.
	 */
	const [dishes, setDishes] = useState<Dish[]>(() => {
		const savedDishes = localStorage.getItem("dishes");
		return savedDishes
			? JSON.parse(savedDishes)
			: [
					{
						id: uuidv4(),
						description: "description",
						name: "name",
						sectionId: selectedSectionId,
					},
			  ];
	});

	/**
	 * Effect to persist the dishes state to localStorage.
	 * Triggers whenever the dishes state changes.
	 */
	useEffect(() => {
		localStorage.setItem("dishes", JSON.stringify(dishes));
	}, [dishes]);

	/**
	 * Adds a new dish to the list.
	 * The new dish is prepended to the list and associated with the selected section.
	 */
	const addDish = () => {
		setDishes([
			{
				id: uuidv4(),
				description: "description",
				name: "name",
				sectionId: selectedSectionId,
			},
			...dishes,
		]);
	};

	/**
	 * Updates an existing dish by its ID.
	 * Merges the updated data with the existing dish data.
	 * @param id - The ID of the dish to update
	 * @param updatedData - The updated data for the dish
	 */
	const updateDish = (id: Dish["id"], updatedData: Partial<Dish>) => {
		setDishes(prev =>
			prev.map(dish => (dish.id === id ? { ...dish, ...updatedData } : dish))
		);
	};

	/**
	 * Deletes a dish by its ID.
	 * Removes the dish from the list of dishes.
	 * @param id - The ID of the dish to delete
	 */
	const deleteDish = (id: Dish["id"]) => {
		setDishes(prev => prev.filter(dish => dish.id !== id));
	};

	/**
	 * Provides the dishes state and related functions to the context.
	 */
	return (
		<DishesContext.Provider
			value={{ dishes, setDishes, addDish, updateDish, deleteDish }}
		>
			{children}
		</DishesContext.Provider>
	);
};
