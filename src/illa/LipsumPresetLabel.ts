/// <reference path='LipsumPresetDefault.ts'/>

module illa {
	export class LipsumPresetLabel extends LipsumPresetDefault {
		
		constructor() {
			super();
			
			this.setWordCount(1, 4);
			this.setFullStopAtEnd(false);
			this.setFullStopAfter(Infinity, Infinity);
			this.setCommaAfter(Infinity, Infinity);
			this.setSemicolonChance(0);
			this.setColonChance(0);
			this.setHyphenAfter(2, 32);
			this.setCapitalStartAfter(Infinity, Infinity);
			this.setEnDashAfter(Infinity, Infinity);
		}
	}
}