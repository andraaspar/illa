module illa {
	export class Prop<T> {
		constructor(private value: T, private onChangedCallback: (oldValue?: T, value?: T) => void, private callbackThis: Object) {
			
		}
		
		get(): T {
			return this.value;
		}
		
		set(value: T): void {
			if (this.get() === value) return;
			var oldValue = this.value;
			this.value = value;
			if (this.onChangedCallback) this.onChangedCallback.call(this.callbackThis, oldValue, value);
		}
		
		toString(): string {
			return '[Prop ' + this.value + ']';
		}
	}
}