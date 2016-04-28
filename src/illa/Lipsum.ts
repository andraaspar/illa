/// <reference path='LipsumPresetDefault.ts'/>

module illa {
	export class Lipsum {

		static generate(preset = new LipsumPresetDefault()): string {
			var result = "";
			var isFirstWord = true;
			var wordsRemaining = this.getRandomWordCount(preset);
			var fullStopWait = this.getRandomFullStopWait(preset);
			var commaWait = this.getRandomCommaWait(preset);
			var hyphenWait = this.getRandomHyphenWait(preset);
			var enDashWait = this.getRandomEnDashWait(preset);
			var capitalStartWait = this.getRandomCapitalStartWait(preset);
			var space = "";
			var spaceWait = 0;
			var word = "";
			var lastWord = "";
			
			while (true) {
				if (!isFirstWord) {
					space = " ";
					if (spaceWait < 1 && lastWord.length >= 4) {
						if (fullStopWait < 1 && wordsRemaining >= preset.fullStopAfterMin) {
							space = ". ";
							fullStopWait = this.getRandomFullStopWait(preset);
							capitalStartWait = 0;
							spaceWait = 2;
						} else if (commaWait < 1 && wordsRemaining >= preset.commaAfterMin) {
							if (this.getRandomIsSemicolon(preset)) {
								space = "; ";
							} else if (this.getRandomIsColon(preset)) {
								space = ": ";
							} else {
								space = ", ";
							}
							spaceWait = 2;
							commaWait = this.getRandomCommaWait(preset);
						} else if (hyphenWait < 1) {
							space = "-";
							hyphenWait = this.getRandomHyphenWait(preset);
							capitalStartWait = Math.max(1, capitalStartWait);
							wordsRemaining++;
							spaceWait = 1;
						} else if (enDashWait < 1) {
							space = " – ";
							enDashWait = this.getRandomEnDashWait(preset);
							spaceWait = 2;
						}
					}
					result += space;
				}
				
				word = this.getRandomWord(preset, lastWord);
				lastWord = word;
				
				if (preset.capitalStart && isFirstWord || capitalStartWait < 1) {
					word = this.capitalizeFirstLetter(word);
					capitalStartWait = this.getRandomCapitalStartWait(preset);
				}
				if (this.getRandomIsHighlighted(preset)) {
					word = preset.highlightBefore + word + preset.highlightAfter;
				}
				
				result += word;
				
				wordsRemaining--;
				spaceWait--;
				fullStopWait--;
				commaWait--;
				hyphenWait--;
				enDashWait--;
				capitalStartWait--;
				
				isFirstWord = false;
				if (wordsRemaining < 1) {
					break;
				}
			}
			
			if (preset.fullStopAtEnd) {
				result += ".";
			}
			
			return result;
		}
		
		protected static getRandomBetweenInclusive(min: number, max: number): number {
			var diff = max - min + 1;
			var result = Math.floor(min + Math.random() * diff);
			if (isNaN(result)) result = Infinity;
			return result;
		}
		
		protected static getRandomCommaWait(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.commaAfterMin, preset.commaAfterMax);
		}
		
		protected static getRandomFullStopWait(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.fullStopAfterMin, preset.fullStopAfterMax);
		}
		
		protected static getRandomHyphenWait(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.hyphenAfterMin, preset.hyphenAfterMax);
		}
		
		protected static getRandomEnDashWait(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.enDashAfterMin, preset.enDashAfterMax);
		}
		
		protected static getRandomWordCount(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.wordCountMin, preset.wordCountMax);
		}
		
		protected static getRandomIsSemicolon(preset: LipsumPreset): boolean {
			return Math.random() < preset.semicolonChance;
		}
		
		protected static getRandomIsColon(preset: LipsumPreset): boolean {
			return Math.random() < preset.colonChance;
		}
		
		protected static getRandomCapitalStartWait(preset: LipsumPreset): number {
			return this.getRandomBetweenInclusive(preset.capitalStartAfterMin, preset.capitalStartAfterMax);
		}
		
		protected static getRandomIsHighlighted(preset: LipsumPreset): boolean {
			return Math.random() < preset.highlightChance;
		}
		
		protected static capitalizeFirstLetter(src: string): string {
			return src.slice(0, 1).toUpperCase() + src.slice(1);
		}
		
		protected static getRandomWord(preset: LipsumPreset, notThisWord: string): string {
			var word = "";
			do {
				word = preset.words[this.getRandomBetweenInclusive(0, preset.words.length - 1)];
			} while (word == notThisWord);
			return word;
		}
	}
}