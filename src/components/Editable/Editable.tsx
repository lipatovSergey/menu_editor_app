import { useState, useEffect, useRef } from "react";

interface EditableProps {
	value: string;
	id: string;
	onChange: (name: string, id: string) => void;
	className?: string; // Новое свойство для классов
}

export function Editable({ value, id, onChange, className }: EditableProps) {
	const [isEditing, setIsEditing] = useState(true);
	const [tempValue, setTempValue] = useState(value);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setTempValue(value);
	}, [value]);

	const startEditing = () => setIsEditing(true);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTempValue(e.target.value);
		adjustTextareaHeight();
	};

	const saveValue = () => {
		const newValue = tempValue.trim();
		if (newValue !== value) {
			onChange(newValue, id);
		}
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Escape") {
			setTempValue(value);
			setIsEditing(false);
		}
	};

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "1px";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	useEffect(() => {
		if (isEditing) {
			adjustTextareaHeight();
		}
	}, [isEditing]);

	return isEditing ? (
		<textarea
			ref={textareaRef}
			value={tempValue}
			onChange={handleChange}
			onBlur={saveValue}
			onKeyDown={handleKeyDown}
			autoFocus
			className={className} // Применяем переданный класс
			style={{
				resize: "none",
				overflowY: "hidden",
				width: "95%",
			}}
		/>
	) : (
		<span
			onDoubleClick={startEditing}
			className={`menuSpan ${className}`} // Применяем переданный класс
		>
			{value}
		</span>
	);
}
