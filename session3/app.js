const express = require('express');
const path = require('path');
const readFile = require('./fileSystem.js');
readFile.readFileNotSync('test.txt', function (data) {
    console.log(data);
});

let app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('Home page');
});

app.get('/about', function (req, res) {
    res.send('about page');
});

app.get('/image', function (req, res) {
    // res.sendFile(__dirname + '/robo3t.png');
    res.sendFile(path.resolve('test.html'));
});

//cach tay to:
// app.get('/test.css', function (req, res) {
//     // res.sendFile(__dirname + '/robo3t.png');
//     res.sendFile(path.resolve('test.css'));
// });

app.listen(8000, function (err) {
    if (err) console.log(err);
    console.log('server is ok')
});