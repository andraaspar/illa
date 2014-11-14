module illa {
	export class Prop2<U, T> {
		constructor(private values: T[], private onChangedCallback: (index?: U, oldValue?: T, value?: T) => void, private callbackThis: Object) {
			
		}
		
		get(index: U): T {
			return this.values[<any>index];
		}
		
		set(index: U, value: T): void {
			if (this.get(index) === value) return;
			var oldValue = this.values[<any>index];
			this.values[<any>index] = value;
			if (this.onChangedCallback) this.onChangedCallback.call(this.callbackThis, index, oldValue, value);
		}
		
		toString(): string {
			return '[Prop2 ' + this.values.join(', ') + ']';
		}
	}
}