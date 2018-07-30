var fileService = require("./FileService.js").fileService;
var encoding = require("encoding");


var text = "";
fileService.encoding =  'latin1'; // latin1 (ISO8859-1, only in node 6.4.0+)

const IN_FILE = "./files/AGENPRON.CSV";
const OUT_FILE = './out_files/AGENPRON_out.CSV';

const regIn  = new RegExp('\r\n|\r|\n|\u2028|\u2029/','g'); // remove todos os \n, de verdade, full, todos mesmo, all in
const regOut = new RegExp('#','g');

fileService.read(IN_FILE, (fileContents, err)=>{

    var resultBuffer = encoding.convert(text, 'latin1');
    text = String(resultBuffer);
    text = fileContents.replace(regIn , ' ');
    text = text.replace(regOut, '#\n');

    fileService.encoding =  'UTF-8'; // gravar sempre em utf-8;
    fileService.write(OUT_FILE ,text ,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Arquivo Gravado !  -  " + OUT_FILE);
        }
    });
    
});
