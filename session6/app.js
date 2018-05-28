const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const methodOverride = require('method-override');
const questionRouter = require('./router/questionRouter.js');
const helpers = require('handlebars-helpers')();
const mongoose = require('mongoose');
const QuestionModel = require('./model/question.model.js');

mongoose.connect('mongodb://localhost/test', (err) => {
    if (err) console.log(err);
    else console.log('DB connect success!');
});

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/question', questionRouter);
app.use(methodOverride('_method'));

//Middleware
app.use((req, res, next) => {
    console.log('hello middleware');
    next();
});

app.get('/', (req, res, next) => {
    QuestionModel.find({}, (err, question) => {
        if (err)
    });
    if (req.questionList.length <= 0) res.render('home', {question : {content: 'khong co cau hoi nao'}});
    else next();
}, function (req, res) {
    res.render('home', {
        question: req.questionList[Math.floor(Math.random() * req.questionList.length)]
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
    res.redirect(`/question/${newQuestion.id}`);
});

app.listen(8000, function (err) {
    if (err) console.log(err);
    console.log('server is ok')
});