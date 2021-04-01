const $score = document.getElementById('total-correct');
const $question = document.getElementById('question');
const $questionContainer = document.getElementById('question-container');
const $trueBtn = document.getElementById('answer-true');
const $falseBtn = document.getElementById('answer-false');
const $resultContainer = document.getElementById('result-container');
const $categorySelector = document.getElementById('category-selector');
const $difficultySelector = document.getElementById('difficulty-selector');

const state = {
    questions: [],
    index: 0,
    score: 0,
};

function scrambleQuestions() {
    return questions.sort(function () {
        return 0.5 - Math.random();
    });
}

function resetQuestionLabels() {
    const successLabels = document.querySelectorAll('.result.is-success');
    for (let i = 0; i < successLabels.length; i++) {
        successLabels[i].classList.remove('is-success');
        successLabels[i].classList.add('is-dark');
    }

    const dangerLabels = document.querySelectorAll('.result.is-danger');
    for (let i = 0; i < dangerLabels.length; i++) {
        dangerLabels[i].classList.remove('is-danger');
        dangerLabels[i].classList.add('is-dark');
    }
}

function printScore() {
    $score.textContent = state.score;
}

function printQuestion() {
    if (state.index === state.questions.length) {
        $question.textContent =
            'Your score is ' + state.score + '. Want to try again?';
        return;
    }
    $question.innerHTML = state.questions[state.index].question;
}

function getUrl() {
    const category = $categorySelector.value;
    const difficulty = $difficultySelector.value;

    return (
        'https://opentdb.com/api.php?amount=10&type=boolean' +
        (category === 'any' ? '' : `&category=${category}`) +
        (difficulty === 'any' ? '' : `&difficulty=${difficulty}`)
    );
}

function getQuestions() {
    return fetch(getUrl())
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Could not fetch questions');
            }

            return response.json();
        })
        .then(function (body) {
            if (body.response_code !== 0) {
                throw new Error('Could not fetch questions');
            }

            return body.results;
        });
}

function resetGame() {
    $questionContainer.classList.add('loading');
    state.index = 0;
    state.score = 0;
    resetQuestionLabels();
    printScore();
    getQuestions()
        .then(function (questions) {
            state.questions = questions;
            printQuestion();
            $questionContainer.classList.remove('loading');
        })
        .catch(function (error) {
            console.error(error);
            initGame('We did not find enough questions in this category.');
            $questionContainer.classList.remove('loading');
        });
}

function answerQuestion(answer) {
    const $resultLabel = $resultContainer.children[state.index];
    $resultLabel.classList.remove('is-dark');

    if (state.questions[state.index].correct_answer === answer) {
        $resultLabel.classList.add('is-success');
        state.score++;
    } else {
        $resultLabel.classList.add('is-danger');
    }

    state.index++;
    printScore();
    printQuestion();
}

function trueBtnClicked() {
    if (state.index === -1) {
        resetGame();
        return;
    }

    if (state.index === state.questions.length) {
        resetGame();
        return;
    }
    answerQuestion('True');
}

function falseBtnClicked() {
    if (state.index === state.questions.length || state.index === -1) {
        return;
    }
    answerQuestion('False');
}

function initGame(error) {
    state.index = -1;
    state.score = 0;
    resetQuestionLabels();
    printScore();
    $question.innerHTML =
        (error ? error + '<br>' : '') +
        'Choose ' +
        (error ? 'another' : 'a') +
        ' category and difficulty. <br> Are you ready?';
}

initGame();

$trueBtn.addEventListener('click', trueBtnClicked);
$falseBtn.addEventListener('click', falseBtnClicked);
