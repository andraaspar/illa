/// <reference path='_module.ts'/>
/// <reference path='Log.ts'/>

module illa {
	export class UnitTest {
		testCount = 0;
		successCount = 0;
		failCount = 0;

		assert(test: boolean, desc = ''): boolean {
			this.testCount++;
			if (test === true) {
				this.successCount++;
			} else {
				this.failCount++;
				if (desc) {
					this.warn('Test failed: ' + desc);
				} else {
					throw 'Test failed.';
				}
			}
			return test;
		}
		
		assertThrowsError(fn: Function, desc = ''): boolean {
			var errorThrown = false;
			try {
				fn();
			} catch (e) {
				errorThrown = true;
			}
			return this.assert(errorThrown, desc);
		}
		
		assertEquals(received, expected, desc = ''): boolean {
			var result = this.assert(received === expected, desc);
			if (!result) {
				this.info('Received:', received);
				this.info('Expected:', expected);
			}
			return result;
		}

		printStats(): void {
			this.info(this.testCount + ' tests completed: ' +
				this.successCount + ' succeeded, ' +
				this.failCount + ' failed.');
		}

		info(...r): void {
			illa.Log.info.apply(illa.Log, r);
		}

		warn(...r): void {
			illa.Log.warn.apply(illa.Log, r);
		}
	}
}