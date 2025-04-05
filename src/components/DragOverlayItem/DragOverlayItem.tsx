import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const DragOverlayItem = ({
	id,
	children,
}: {
	id: string | number;
	children: ReactNode;
}) => {
	// Get draggable props
	const { setNodeRef, transform } = useDraggable({ id });

	// Apply translation transform if dragging
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		// Element that will be visible during drag
		<div ref={setNodeRef} style={style} className='drag-overlay-item'>
			{children}
		</div>
	);
};
