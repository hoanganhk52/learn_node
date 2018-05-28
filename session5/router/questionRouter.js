const express = require('express');
const fs = require('fs');
const Router = express.Router();
const path = require('path');

Router.get('/:id', function (req, res) {

    let questionID = req.params.id;
    let questionList = JSON.parse(fs.readFileSync(path.join(__dirname, '/../questions.json'), 'utf8'));
    let question = questionList.filter(question => question.id == questionID)[0];

    res.render('question', {
        question,
        total: question.yes + question.no
    });
});

//vote
Router.put('/', function (req, res) {
    let vote = req.body.vote;
    let questionID = req.body.questionID;
    let questionList = JSON.parse(fs.readFileSync(path.join(__dirname, '/../questions.json'), 'utf8'));
    let newQuestionList = questionList.map((question) => {
        if (question.id == questionID) {
            if (vote == 'yes') {
                question.yes++;
            } else {
                question.no++;
            }
        }

        return question;
    });

    fs.writeFileSync(path.join(__dirname, '/../questions.json'), JSON.stringify(newQuestionList), 'utf8');
    res.redirect(`/question/${questionID}`);
});

module.exports = Router;