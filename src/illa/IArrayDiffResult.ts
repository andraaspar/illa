module illa {
	export interface IArrayDiffResult<T> {
		item: T;
		added: boolean;
		oldIndex: number;
		newIndex: number;
	}
}