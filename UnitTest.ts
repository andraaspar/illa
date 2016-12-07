import { info, warn } from './Log'

export class UnitTest {
	testCount = 0
	successCount = 0
	failCount = 0

	assert(test: boolean, desc = ''): boolean {
		this.testCount++
		if (test === true) {
			this.successCount++
		} else {
			this.failCount++
			if (desc) {
				warn('Test failed: ' + desc)
			} else {
				throw 'Test failed.'
			}
		}
		return test
	}

	assertThrowsError(fn: Function, desc = ''): boolean {
		var errorThrown = false
		try {
			fn()
		} catch (e) {
			errorThrown = true
		}
		return this.assert(errorThrown, desc)
	}

	assertEquals<T>(received: T, expected: T, desc = ''): boolean {
		var result = this.assert(received === expected, desc)
		if (!result) {
			info('Received:', received)
			info('Expected:', expected)
		}
		return result
	}

	printStats(): void {
		info(this.testCount + ' tests completed: ' +
			this.successCount + ' succeeded, ' +
			this.failCount + ' failed.')
	}
}