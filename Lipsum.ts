import { LipsumPreset } from './LipsumPreset'
import { LipsumPresetDefault } from './LipsumPresetDefault'

export function lipsum(preset = new LipsumPresetDefault()): string {
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