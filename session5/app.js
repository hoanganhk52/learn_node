const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');

var helpers = require('handlebars-helpers')();

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home', {
        name: 'hoang anh',
        html: '<h3>hoang anh</h3>'
    });
});

app.get('/asks', function (req, res) {
    res.render('asks');
});

app.get('/list', function (req, res) {
    res.render('list', {
        data: [
            'hoang anh',
            'ngan ha',
            'dau dau'
        ]
    });
});

app.post('/api/questions', function (req, res) {
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    let newQuestion = {
        id: questionList.length,
        content: req.body.question,
        yes: 0,
        no: 0
    };
    questionList.push(newQuestion);
    fs.writeFileSync('./questions.json', JSON.stringify(questionList), 'utf8');
    res.redirect(`/question?questionID=${newQuestion.id}`);
});

//cach 1
// app.get('/question/:id', function (req, res) {
//     let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
//     let question = questionList.filter(question => _.toInteger(question.id) === _.toInteger(req.params.id))[0];
//
//     res.render('question', {
//         question
//     });
// });

//cach 2
app.get('/question', function (req, res) {
    let questionID = req.query.questionID;
    let questionList = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));
    let question = questionList.filter(question => _.toInteger(question.id) === _.toInteger(questionID))[0];

    res.render('question', {
        question,
        total: question.yes + question.no
    });
});

//vote
app.get('/:id/:choice', function (req, res) {

});

app.listen(8000, function (err) {
    if (err) console.log(err);
    console.log('server is ok')
});