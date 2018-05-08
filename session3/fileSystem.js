let fs = require('fs');

let obj = {
    a: 5,
    b: 10
};

// console.log('begin');
// fs.writeFile('./test.txt', JSON.stringify(obj), function (err) {
//     if(err) console.log('error');
//     console.log("success");
// });
// console.log('finish');

// fs.readFile('test.txt', function (err, data) {
//    if (err) console.log(err);
//    else console.log(data);
// });
//
console.log('begin');
let file = fs.readFileSync('./test.txt', 'utf8');
let dataObj = JSON.parse(file);
console.log(dataObj.a);
console.log('finish');

const readFileNotSync = function (path, onReadFileDone) {
    fs.readFile(path, 'utf8', function (err, data) {
        onReadFileDone(data);
    });
};

module.exports = {
    readFileNotSync
};