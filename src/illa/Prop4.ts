module illa {
	export class Prop4<U, V, T> {
	
		constructor(private values: T[], private onChangedCallback: (index?: U, index2?: V, oldValue?: T, value?: T) => void, private callbackThis: Object) {
			
		}
		
		get(index: U, index2: V): T {
			return this.values[<any>index * 2 + <any>index2];
		}
		
		set(index: U, index2: V, value: T): void {
			if (this.get(index, index2) === value) return;
			var realIndex: number = <any>index * 2 + <any>index2;
			var oldValue = this.values[realIndex];
			this.values[realIndex] = value;
			if (this.onChangedCallback) this.onChangedCallback.call(this.callbackThis, index, index2, oldValue, value);
		}
		
		toString(): string {
			return '[Prop4 ' + this.values.join(', ') + ']';
		}
	}
}