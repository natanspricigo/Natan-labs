var fs = require('fs');
const {
  exec
} = require('child_process');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');

function readInfo(filename) {
  return fileType(readChunk.sync(filename, 0, 262));
}

function readFiles(dirname, arg0, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }


    filenames.forEach(function(filename) {
      if (filename != ".DS_Store") {

        var filePath = dirname + "/" + filename;

        var stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          readFiles(filePath);
        } else {
          var fileinfo = readInfo(filePath);
          console.log(filePath + "-----------" + JSON.stringify(fileinfo));
          if (arg0 == "rename" && fileinfo.ext) {
            const comand = "mv " + filePath + " " + dirname + "/" + filename.split('.')[0]+ "." + fileinfo.ext;
            exec(comand, function(error, stdout, stderr) {
              console.log(comand);
              if (error) {
                console.error(error);
                return;
              }
            });
          };
        }
      }
    });
  });
}

var arg2 = process.argv[2];
console.log(arg2);
readFiles("./files", arg2);