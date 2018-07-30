
class RegexReplaceCreator {

	constructor(regex, textReplace) {
		this.regex = regex;
		this.textReplace = textReplace;
	}

	replace(text) {
		if (this.regex && text) {
			return text.replace(this.regex, this.textReplace);
		};
	}
}

module.exports = RegexReplaceCreator;
