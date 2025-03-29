type UpdateEntityParams<T> = {
	endpoint: string;
	id: string;
	updatedData: Partial<T>;
	setState: React.Dispatch<React.SetStateAction<T[]>>; // Используем setState напрямую
	onSuccess?: (updateEntity: T) => void;
	onError?: (error: Error) => void;
};

export async function updateEntity<T extends { id: string }>({
	endpoint,
	id,
	updatedData,
	setState,
	onSuccess,
	onError,
}: UpdateEntityParams<T>): Promise<void> {
	let rollbackData: T[] = [];
	try {
		// optimistic update
		setState((prev: T[]) => {
			rollbackData = [...prev]; // save previous data for rollback
			return prev.map(item =>
				item.id === id ? { ...item, ...updatedData } : item
			);
		});
		const response = await fetch(
			`http://192.168.213.103:3001/${endpoint}/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			}
		);

		if (!response.ok) throw new Error("Update failed");

		// sync data with server
		const updatedEntity = await response.json();
		setState((prev: T[]) =>
			prev.map(item => (item.id === id ? { ...item, ...updatedEntity } : item))
		);

		onSuccess?.(updatedEntity);
	} catch (error) {
		setState(() => rollbackData);
		onError?.(error instanceof Error ? error : new Error("Update failed"));
		console.error("Update error", error);
	}
}
