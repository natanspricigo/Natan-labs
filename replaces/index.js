var fileService = require("./FileService").fileService;
var Processador = require("./processador");
var RegexReplaceCreator = require("./regexReplaceCreator");


const regIn = new RegExp('\r\n|\r|\n|\u2028|\u2029/', 'g'); // remove todos os \n, de verdade, full, todos mesmo, all in
const regOut = new RegExp('#', 'g');

var regexReplaceCreators = [];
regexReplaceCreators.push(new RegexReplaceCreator(regIn, ' '));
regexReplaceCreators.push(new RegexReplaceCreator(regOut, '#\n'));

var processador = new Processador(regexReplaceCreators);

// faz a magia acontecer
processador.processa("./files/AGENPRON.CSV", './out_files/AGENPRON_out.CSV', 'latin1', "utf-8");
processador.processa('./files/PACI.CSV', './out_files/PACI_out.CSV', 'latin1', "utf-8");
processador.processa('./files/PACIAGEN.CSV', './out_files/PACIAGEN_out.CSV', 'latin1', "utf-8");
