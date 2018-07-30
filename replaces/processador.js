var fileService = require("./FileService.js").fileService;
var encoding = require("encoding");

class Processador{

	constructor(regexReplaceCreators) {
		if (Array.isArray(regexReplaceCreators)) {
			this.regexReplaceCreator = regexReplaceCreators;
		}else{
			this.regexReplaceCreator = [regexReplaceCreators];
		}
	}

	processa(fileIn, fileOut, encodingIn = "UTF-8", encodingOut = "UTF-8") {
		
		console.log("Aguarde, processando, convertendo e gravando arquivo ...");
		var self = this;
		fileService.encoding = encodingIn;

		fileService.read(fileIn, (fileContents, err) => {
			var text = String(fileContents);
			
			self.regexReplaceCreator.forEach((e,i)=>{
				if (e) {
					text = e.replace(text);
				};
			});

			fileService.encoding = encodingOut;
			fileService.write(fileOut, text, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Arquivo Gravado !  ->  " + fileOut);
				}
			});
		});
	}

	converteParaUTF_8(text, encodingText) {
		return this.convertePara(text, encodingText);
	}

	convertePara(text, encodingText, encodingOut = "UTF-8") {
		var resultBuffer = encoding.convert(text, encodingText, encodingOut);
		return String(resultBuffer);
	}
}

module.exports = Processador;