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
	// Get sortable props for the item
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, data });

	// Apply styles based on drag state and transform
	const style = {
		transform: CSS.Transform.toString(transform), // Apply drag translation
		transition, // Apply transition for smooth reordering
		opacity: isDragging ? 0 : 1, // Fade out while dragging
		cursor: isDragging ? "grabbing" : "grab", // Change cursor during drag
		touchAction: "none", // Prevent default touch scrolling during drag
	};

	return (
		<div
			ref={setNodeRef} // Ref to the DOM node
			style={style} // Apply dynamic styles
			{...attributes} // Accessibility attributes for drag and drop
			{...listeners} // Event listeners for drag interactions
			className='sortable-item'
		>
			{children}
		</div>
	);
};
