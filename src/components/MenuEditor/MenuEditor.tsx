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

	// Добавляем состояние для DragOverlay
	const [activeItem, setActiveItem] = useState<{
		id: string;
		type: "dish" | "section";
	} | null>(null);
	const { template } = useMenuTemplate();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250, // Работает только для "press" жестов
				tolerance: 5, // Должно быть > 5px
			},
		})
	);

	// Обработчик начала перетаскивания
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const type = active.data.current?.type as "dish" | "section" | undefined;

		if (type) {
			setActiveItem({
				id: active.id.toString(),
				type: type, // Используем явный type из данных
			});
		}
		document.body.style.overflow = "hidden";
	};

	// Обработчик окончания перетаскивания
	const handleDragEnd = (event: DragEndEvent) => {
		document.body.style.overflow = "auto";
		const { active, over } = event;

		if (!over || active.id === over.id) {
			setActiveItem(null);

			return;
		}

		// Обновление позиций
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

				{/* Добавляем DragOverlay */}
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
