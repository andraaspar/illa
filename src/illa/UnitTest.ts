/// <reference path='../../lib/JQuery.d.ts'/>
/// <reference path='Log.ts'/>

module illa {
	export class UnitTest {
		testCount = 0;
		successCount = 0;
		failCount = 0;

		constructor(public printTarget: JQuery) {

		}

		assert(test: boolean, desc = ''): boolean {
			this.testCount++;
			if (test === true) {
				this.successCount++;
			} else {
				this.failCount++;
				if (desc) {
					this.warn('Test failed:', desc);
				} else {
					throw 'Test failed.';
				}
			}
			return test;
		}

		printStats(): void {
			this.info(this.testCount, 'tests completed:',
				this.successCount, 'succeeded,',
				this.failCount, 'failed.');
		}

		info(...r): void {
			if (this.printTarget) {
				var out = jQuery('<p>').text(r.join(' '));
				this.printTarget.append(out);
			} else {
				Log.info.apply(Log, r);
			}
		}

		warn(...r): void {
			if (this.printTarget) {
				var out = jQuery('<p>').text(r.join(' ')).prepend('<b>WARNING: </b>');
				this.printTarget.append(out);
			} else {
				Log.warn.apply(Log, r);
			}
		}
	}
}