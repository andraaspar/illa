/// <reference path='ArrayUtil.ts'/>

module illa {
	export class Map<K, V> {
		
		constructor(private keys: K[] = [], private values: V[] = []) {
			
		}
		
		set(key: K, value: V): void {
			var index = illa.ArrayUtil.indexOf(this.keys, key);
			if (index == -1) {
				index = this.keys.push(key) - 1;
			}
			this.values[index] = value;
		}
		
		get(key: K): V {
			var index = illa.ArrayUtil.indexOf(this.keys, key);
			return this.values[index];
		}
		
		remove(key: K): void {
			var index = illa.ArrayUtil.indexOf(this.keys, key);
			if (index != -1) {
				this.keys.splice(index, 1);
				this.values.splice(index, 1);
			}
		}
		
		removeAll(): void {
			this.keys = [];
			this.values = [];
		}
		
		setAll(map: Map<K, V>): void {
			var newKeys = map.getKeys();
			var newValues = map.getValues();
			for (var i = 0, n = newKeys.length; i < n; i++) {
				var newKey = newKeys[i];
				var newValue = newValues[i];
				this.set(newKey, newValue);
			}
		}
		
		getLength() {return this.keys.length}
		getKeys() {return this.keys}
		getValues() {return this.values}
	}
}