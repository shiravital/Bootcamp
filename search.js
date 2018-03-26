const fs = require('fs');
const args = process.argv;
let folder = RemoveLastPartOfPath(args[1]);
const fileType = args[2];
const text = args[3];
let filesWithText = [];

function RemoveLastPartOfPath(path) {
    let arr = path.split('\\');
    arr.pop();
    return(arr.join('\\'));
}

function getFilesRecursive (folder) {
    let fileContents = fs.readdirSync(folder),
        fileTree = [],
        filePath,
        stats;
    fileContents.forEach(fileName => {
        filePath = folder + '\\' + fileName;
        stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
            fileTree.push({
                name: filePath,
                children: getFilesRecursive(filePath)
            });
        }
        else {
            fileTree.push({
                name: filePath
            });
            let data = fs.readFileSync(filePath);
            if (data.indexOf(text) >= 0 && filePath.split(".").pop() === fileType) {
                filesWithText.push(filePath);
            }
        }
    });
    return filesWithText;
};


let files = getFilesRecursive(folder);
if(files.length > 0) {
    files.forEach(file => {console.log(file);}
   );
}
else console.log("No file was found");
