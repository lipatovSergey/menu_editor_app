import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

export const SortableItemWrapper = ({
	id,
	children,
	data,
}: {
	id: string | number;
	children: ReactNode;
	data?: Record<string, unknown>;
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, data });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		cursor: isDragging ? "grabbing" : "grab",
		touchAction: "none",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='sortable-item'
		>
			{children}
		</div>
	);
};
