import LipsumPresetDefault from './LipsumPresetDefault';

export class LipsumPresetName extends LipsumPresetDefault {
	
	constructor() {
		super();
		
		this.setWordCount(2, 3);
		this.setFullStopAtEnd(false);
		this.setFullStopAfter(Infinity, Infinity);
		this.setCommaAfter(Infinity, Infinity);
		this.setSemicolonChance(0);
		this.setColonChance(0);
		this.setHyphenAfter(2, 10);
		this.setCapitalStartAfter(0, 0);
		this.setEnDashAfter(Infinity, Infinity);
	}
}

export default LipsumPresetName;