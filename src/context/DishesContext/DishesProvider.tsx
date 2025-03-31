import { v4 as uuidv4 } from "uuid";
import { useState, ReactNode, useEffect } from "react";
import { DishesContext } from "./DishesContext";
import type { Dish } from "../../types";
import { useSectionsContext } from "../SectionsContext/SectionsContext";

type DishesProviderProps = {
	children: ReactNode;
};

export const DishesProvider = ({ children }: DishesProviderProps) => {
	const { selectedSectionId } = useSectionsContext();
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

	useEffect(() => {
		localStorage.setItem("dishes", JSON.stringify(dishes));
	}, [dishes]);

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

	const updateDish = (id: Dish["id"], updatedData: Partial<Dish>) => {
		setDishes(prev => {
			return prev.map(dish =>
				dish.id === id ? { ...dish, ...updatedData } : dish
			);
		});
	};

	const deleteDish = (id: Dish["id"]) => {
		setDishes(prev => prev.filter(dish => dish.id !== id));
	};

	return (
		<DishesContext.Provider
			value={{ dishes, setDishes, addDish, updateDish, deleteDish }}
		>
			{children}
		</DishesContext.Provider>
	);
};
