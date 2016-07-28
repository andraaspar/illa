import LipsumPresetDefault from './LipsumPresetDefault';

export class LipsumPresetTitle extends LipsumPresetDefault {
	
	constructor() {
		super();
		
		this.setWordCount(2, 8);
		this.setFullStopAtEnd(false);
		this.setFullStopAfter(Infinity, Infinity);
		this.setCommaAfter(2, 32);
		this.setSemicolonChance(0);
		this.setColonChance(.5);
		this.setHyphenAfter(2, 32);
		this.setCapitalStartAfter(0, 0);
		this.setEnDashAfter(2, 32);
	}
}

export default LipsumPresetTitle;