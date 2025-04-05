import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import DishesList from "../DishesList/DishesList";
import MenuSections from "../MenuSections/MenuSections";
import { MenuSectionItem } from "../MenuSectionItem/MenuSectionItem";
import { DishCard } from "../DishCard/DishCard";
import { DragOverlayItem } from "../DragOverlayItem/DragOverlayItem";
import { useMenuTemplate } from "../../context/MenuTemplateContext/MenuTemplateContext";
import { useSectionsContext } from "../../context/SectionsContext/SectionsContext";
import { useDishesContext } from "../../context/DishesContext/DishesContext";
import { Link } from "react-router-dom";
import styles from "./MenuEditor.module.css";

export default function MenuEditor() {
	const { dishes, setDishes } = useDishesContext();
	const { sections, setSections } = useSectionsContext();

	// State for the currently dragged item
	const [activeItem, setActiveItem] = useState<{
		id: string;
		type: "dish" | "section";
	} | null>(null);
	const { template } = useMenuTemplate();

	// Configure drag and drop sensors
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	// Handle drag start event
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const type = active.data.current?.type as "dish" | "section" | undefined;

		if (type) {
			setActiveItem({
				id: active.id.toString(),
				type: type,
			});
		}
		document.body.style.overflow = "hidden"; // Prevent scrolling during drag
	};

	// Handle drag end event
	const handleDragEnd = (event: DragEndEvent) => {
		document.body.style.overflow = "auto"; // Restore scrolling
		const { active, over } = event;

		if (!over || active.id === over.id) {
			setActiveItem(null);
			return;
		}

		const group = active.data.current?.group;
		if (group === "sections") {
			setSections(items =>
				arrayMove(
					items,
					items.findIndex(i => i.id === active.id),
					items.findIndex(i => i.id === over.id)
				)
			);
		} else {
			setDishes(items =>
				arrayMove(
					items,
					items.findIndex(i => i.id === active.id),
					items.findIndex(i => i.id === over.id)
				)
			);
		}

		setActiveItem(null);
	};

	console.log(activeItem);

	return (
		<div className={`${styles.editor} ${template.menu}`}>
			<div className={styles.editorHeader}>
				<Link className={styles.backBtn} to={"/templates"}>
					Back to template selection
				</Link>
			</div>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sections.map(s => s.id)}
					strategy={horizontalListSortingStrategy}
				>
					<MenuSections />
				</SortableContext>

				<SortableContext
					items={dishes.map(d => d.id)}
					strategy={verticalListSortingStrategy}
				>
					<DishesList />
				</SortableContext>

				{/* Display the dragged item */}
				<DragOverlay style={{ zIndex: 1000 }}>
					{activeItem && (
						<DragOverlayItem id={activeItem.id}>
							{activeItem.type === "dish" ? (
								dishes.find(d => d.id === activeItem.id) ? (
									<DishCard
										dish={dishes.find(d => d.id === activeItem.id)!}
										isSorting={false}
									/>
								) : null
							) : sections.find(s => s.id === activeItem.id) ? (
								<MenuSectionItem
									section={sections.find(s => s.id === activeItem.id)!}
									isSorting={false}
								/>
							) : null}
						</DragOverlayItem>
					)}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
