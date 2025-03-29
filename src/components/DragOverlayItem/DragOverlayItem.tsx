import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const DragOverlayItem = ({
	id,
	children,
}: {
	id: string | number;
	children: ReactNode;
}) => {
	const { setNodeRef, transform } = useDraggable({ id });

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div ref={setNodeRef} style={style} className='drag-overlay-item'>
			{children}
		</div>
	);
};
