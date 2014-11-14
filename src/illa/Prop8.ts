module illa {
	export class Prop8<U, V, W, T> {
	
		constructor(private values: T[], private onChangedCallback: (index?: U, index2?: V, index3?: W, oldValue?: T, value?: T) => void, private callbackThis: Object) {
			
		}
		
		get(index: U, index2: V, index3: W): T {
			return this.values[<any>index * 4 + <any>index2 * 2 + <any>index3];
		}
		
		set(index: U, index2: V, index3: W, value: T): void {
			if (this.get(index, index2, index3) === value) return;
			var realIndex: number = <any>index * 4 + <any>index2 * 2 + <any>index3;
			var oldValue = this.values[realIndex];
			this.values[realIndex] = value;
			if (this.onChangedCallback) this.onChangedCallback.call(this.callbackThis, index, index2, index3, oldValue, value);
		}
		
		toString(): string {
			return '[Prop8 ' + this.values.join(', ') + ']';
		}
	}
}