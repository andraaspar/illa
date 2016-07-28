export class LipsumPreset {
	words: string[];
	wordCountMin: number;
	wordCountMax: number;
	capitalStart: boolean;
	fullStopAtEnd: boolean;
	fullStopAfterMin: number;
	fullStopAfterMax: number;
	commaAfterMin: number;
	commaAfterMax: number;
	semicolonChance: number;
	colonChance: number;
	hyphenAfterMin: number;
	hyphenAfterMax: number;
	capitalStartAfterMin: number;
	capitalStartAfterMax: number;
	enDashAfterMin: number;
	enDashAfterMax: number;
	highlightChance: number;
	highlightBefore: string;
	highlightAfter: string;
	
	setWordCount(min: number, max: number) {
		this.wordCountMin = min;
		this.wordCountMax = max;
		return this;
	}
	
	setCapitalStart(v: boolean) {
		this.capitalStart = v;
		return this;
	}
	
	setFullStopAtEnd(v: boolean) {
		this.fullStopAtEnd = v;
		return this;
	}
	
	setFullStopAfter(min: number, max: number) {
		this.fullStopAfterMin = min;
		this.fullStopAfterMax = max;
		return this;
	}
	
	setCommaAfter(min: number, max: number) {
		this.commaAfterMin = min;
		this.commaAfterMax = max;
		return this;
	}
	
	setSemicolonChance(v: number) {
		this.semicolonChance = v;
		return this;
	}
	
	setColonChance(v: number) {
		this.colonChance = v;
		return this;
	}
	
	setHyphenAfter(min: number, max: number) {
		this.hyphenAfterMin = min;
		this.hyphenAfterMax = max;
		return this;
	}
	
	setCapitalStartAfter(min: number, max: number) {
		this.capitalStartAfterMin = min;
		this.capitalStartAfterMax = max;
		return this;
	}
	
	setEnDashAfter(min: number, max: number) {
		this.enDashAfterMin = min;
		this.enDashAfterMax = max;
		return this;
	}
	
	setHighlight(chance: number, before = this.highlightBefore, after = this.highlightAfter) {
		this.highlightChance = chance;
		this.highlightBefore = before;
		this.highlightAfter = after;
		return this;
	}
	
	setWords(v: string[]) {
		this.words = v;
		return this;
	}
}

export default LipsumPreset;