export interface LipsumPreset {
	words: string[]
	wordCountMin: number
	wordCountMax: number
	capitalStart: boolean
	fullStopAtEnd: boolean
	fullStopAfterMin: number
	fullStopAfterMax: number
	commaAfterMin: number
	commaAfterMax: number
	semicolonChance: number
	colonChance: number
	hyphenAfterMin: number
	hyphenAfterMax: number
	capitalStartAfterMin: number
	capitalStartAfterMax: number
	enDashAfterMin: number
	enDashAfterMax: number
	highlightChance: number
	highlightBefore: string
	highlightAfter: string
}

export const WORDS = ['a', 'ac', 'accumsan', 'adipiscing', 'aenean', 'aliquam', 'aliquet', 'amet', 'ante', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'commodo', 'condimentum', 'congue', 'consectetur', 'consequat', 'convallis', 'cras', 'curabitur', 'cursus', 'dapibus', 'diam', 'dictum', 'dolor', 'donec', 'dui', 'duis', 'eget', 'eleifend', 'elementum', 'elit', 'enim', 'erat', 'eros', 'est', 'et', 'eu', 'euismod', 'ex', 'facilisis', 'faucibus', 'feugiat', 'finibus', 'fringilla', 'fusce', 'gravida', 'hendrerit', 'iaculis', 'id', 'in', 'interdum', 'ipsum', 'justo', 'lacinia', 'lacus', 'lectus', 'leo', 'libero', 'ligula', 'lorem', 'luctus', 'magna', 'massa', 'mattis', 'mauris', 'maximus', 'metus', 'mi', 'molestie', 'mollis', 'morbi', 'nam', 'nec', 'neque', 'nibh', 'nisi', 'nisl', 'non', 'nulla', 'nullam', 'nunc', 'orci', 'ornare', 'pellentesque', 'phasellus', 'placerat', 'porta', 'porttitor', 'posuere', 'praesent', 'pretium', 'proin', 'pulvinar', 'purus', 'quam', 'quis', 'rhoncus', 'risus', 'rutrum', 'sagittis', 'sapien', 'sed', 'sem', 'semper', 'sit', 'sodales', 'sollicitudin', 'suscipit', 'tempor', 'tempus', 'tortor', 'turpis', 'ullamcorper', 'ultrices', 'ultricies', 'urna', 'ut', 'vehicula', 'vel', 'velit', 'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate']

export const PRESET_DEFAULT: LipsumPreset = {
	wordCountMin: 3,
	wordCountMax: 100,
	capitalStart: true,
	fullStopAtEnd: true,
	fullStopAfterMin: 3,
	fullStopAfterMax: 25,
	commaAfterMin: 2,
	commaAfterMax: 25,
	semicolonChance: .05,
	colonChance: .05,
	hyphenAfterMin: 5,
	hyphenAfterMax: 50,
	capitalStartAfterMin: 5,
	capitalStartAfterMax: 50,
	enDashAfterMin: 5,
	enDashAfterMax: 50,
	highlightChance: 0,
	highlightBefore: '<mark>',
	highlightAfter: '</mark>',
	words: WORDS,
}

export const PRESET_LABEL: LipsumPreset = {
	wordCountMin: 1,
	wordCountMax: 4,
	capitalStart: true,
	fullStopAtEnd: false,
	fullStopAfterMin: Infinity,
	fullStopAfterMax: Infinity,
	commaAfterMin: Infinity,
	commaAfterMax: Infinity,
	semicolonChance: 0,
	colonChance: 0,
	hyphenAfterMin: 2,
	hyphenAfterMax: 32,
	capitalStartAfterMin: Infinity,
	capitalStartAfterMax: Infinity,
	enDashAfterMin: Infinity,
	enDashAfterMax: Infinity,
	highlightChance: 0,
	highlightBefore: '<mark>',
	highlightAfter: '</mark>',
	words: WORDS,
}

export const PRESET_NAME: LipsumPreset = {
	wordCountMin: 2,
	wordCountMax: 3,
	capitalStart: true,
	fullStopAtEnd: false,
	fullStopAfterMin: Infinity,
	fullStopAfterMax: Infinity,
	commaAfterMin: Infinity,
	commaAfterMax: Infinity,
	semicolonChance: 0,
	colonChance: 0,
	hyphenAfterMin: 2,
	hyphenAfterMax: 10,
	capitalStartAfterMin: 0,
	capitalStartAfterMax: 0,
	enDashAfterMin: Infinity,
	enDashAfterMax: Infinity,
	highlightChance: 0,
	highlightBefore: '<mark>',
	highlightAfter: '</mark>',
	words: WORDS,
}

export const PRESET_TITLE: LipsumPreset = {
	wordCountMin: 2,
	wordCountMax: 8,
	capitalStart: true,
	fullStopAtEnd: false,
	fullStopAfterMin: Infinity,
	fullStopAfterMax: Infinity,
	commaAfterMin: 2,
	commaAfterMax: 32,
	semicolonChance: 0,
	colonChance: .5,
	hyphenAfterMin: 2,
	hyphenAfterMax: 32,
	capitalStartAfterMin: 0,
	capitalStartAfterMax: 0,
	enDashAfterMin: 2,
	enDashAfterMax: 32,
	highlightChance: 0,
	highlightBefore: '<mark>',
	highlightAfter: '</mark>',
	words: WORDS,
}

export function lipsum(preset: LipsumPreset = PRESET_DEFAULT): string {
	var result = ""
	var isFirstWord = true
	var wordsRemaining = getRandomWordCount(preset)
	var fullStopWait = getRandomFullStopWait(preset)
	var commaWait = getRandomCommaWait(preset)
	var hyphenWait = getRandomHyphenWait(preset)
	var enDashWait = getRandomEnDashWait(preset)
	var capitalStartWait = getRandomCapitalStartWait(preset)
	var space = ""
	var spaceWait = 0
	var word = ""
	var lastWord = ""

	while (true) {
		if (!isFirstWord) {
			space = " "
			if (spaceWait < 1 && lastWord.length >= 4) {
				if (fullStopWait < 1 && wordsRemaining >= preset.fullStopAfterMin) {
					space = ". "
					fullStopWait = getRandomFullStopWait(preset)
					capitalStartWait = 0
					spaceWait = 2
				} else if (commaWait < 1 && wordsRemaining >= preset.commaAfterMin) {
					if (getRandomIsSemicolon(preset)) {
						space = "; "
					} else if (getRandomIsColon(preset)) {
						space = ": "
					} else {
						space = ", "
					}
					spaceWait = 2
					commaWait = getRandomCommaWait(preset)
				} else if (hyphenWait < 1) {
					space = "-"
					hyphenWait = getRandomHyphenWait(preset)
					capitalStartWait = Math.max(1, capitalStartWait)
					wordsRemaining++
					spaceWait = 1
				} else if (enDashWait < 1) {
					space = " – "
					enDashWait = getRandomEnDashWait(preset)
					spaceWait = 2
				}
			}
			result += space
		}

		word = getRandomWord(preset, lastWord)
		lastWord = word

		if (preset.capitalStart && isFirstWord || capitalStartWait < 1) {
			word = capitalizeFirstLetter(word)
			capitalStartWait = getRandomCapitalStartWait(preset)
		}
		if (getRandomIsHighlighted(preset)) {
			word = preset.highlightBefore + word + preset.highlightAfter
		}

		result += word

		wordsRemaining--
		spaceWait--
		fullStopWait--
		commaWait--
		hyphenWait--
		enDashWait--
		capitalStartWait--

		isFirstWord = false
		if (wordsRemaining < 1) {
			break
		}
	}

	if (preset.fullStopAtEnd) {
		result += "."
	}

	return result
}

function getRandomBetweenInclusive(min: number, max: number): number {
	var diff = max - min + 1
	var result = Math.floor(min + Math.random() * diff)
	if (isNaN(result)) result = Infinity
	return result
}

function getRandomCommaWait(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.commaAfterMin, preset.commaAfterMax)
}

function getRandomFullStopWait(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.fullStopAfterMin, preset.fullStopAfterMax)
}

function getRandomHyphenWait(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.hyphenAfterMin, preset.hyphenAfterMax)
}

function getRandomEnDashWait(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.enDashAfterMin, preset.enDashAfterMax)
}

function getRandomWordCount(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.wordCountMin, preset.wordCountMax)
}

function getRandomIsSemicolon(preset: LipsumPreset): boolean {
	return Math.random() < preset.semicolonChance
}

function getRandomIsColon(preset: LipsumPreset): boolean {
	return Math.random() < preset.colonChance
}

function getRandomCapitalStartWait(preset: LipsumPreset): number {
	return getRandomBetweenInclusive(preset.capitalStartAfterMin, preset.capitalStartAfterMax)
}

function getRandomIsHighlighted(preset: LipsumPreset): boolean {
	return Math.random() < preset.highlightChance
}

function capitalizeFirstLetter(src: string): string {
	return src.slice(0, 1).toUpperCase() + src.slice(1)
}

function getRandomWord(preset: LipsumPreset, notThisWord: string): string {
	var word = ""
	do {
		word = preset.words[getRandomBetweenInclusive(0, preset.words.length - 1)]
	} while (word == notThisWord)
	return word
}
