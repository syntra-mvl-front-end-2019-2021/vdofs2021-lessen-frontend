const questions = [
    {
        question: 'Linus Torvalds created Linux and Git.',
        correctAnswer: 'True',
    },
    {
        question:
            'The programming language "Python" is based off a modified version of "JavaScript".',
        correctAnswer: 'False',
    },
    {
        question: 'The logo for Snapchat is a Bell.',
        correctAnswer: 'False',
    },
    {
        question: 'RAM stands for Random Access Memory.',
        correctAnswer: 'True',
    },
    {
        question: '"HTML" stands for Hypertext Markup Language.',
        correctAnswer: 'True',
    },
    {
        question:
            'In most programming languages, the operator ++ is equivalent to the statement "+= 1".',
        correctAnswer: 'True',
    },
    {
        question: 'The Windows 7 operating system has six main editions.',
        correctAnswer: 'True',
    },
    {
        question:
            'The Windows ME operating system was released in the year 2000.',
        correctAnswer: 'True',
    },
    {
        question:
            'The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.',
        correctAnswer: 'False',
    },
    {
        question: 'Linux was first created as an alternative to Windows XP.',
        correctAnswer: 'False',
    },
];

const $score = document.getElementById('total-correct');
const $question = document.getElementById('question');
const $trueBtn = document.getElementById('answer-true');
const $falseBtn = document.getElementById('answer-false');
const $resultContainer = document.getElementById('result-container');

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
    $question.textContent = state.questions[state.index].question;
}

function resetGame() {
    state.questions = scrambleQuestions();
    state.index = 0;
    state.score = 0;
    resetQuestionLabels();
    printScore();
    printQuestion();
}

function answerQuestion(answer) {
    const $resultLabel = $resultContainer.children[state.index];
    $resultLabel.classList.remove('is-dark');

    if (state.questions[state.index].correctAnswer === answer) {
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
    if (state.index === state.questions.length) {
        resetGame();
        return;
    }
    answerQuestion('True');
}

function falseBtnClicked() {
    if (state.index === state.questions.length) {
        return;
    }
    answerQuestion('False');
}

resetGame();

$trueBtn.addEventListener('click', trueBtnClicked);
$falseBtn.addEventListener('click', falseBtnClicked);

fetch('https://opentdb.com/api.php?amount=10&type=boolean')
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

        console.log(body.results);
    })
    .catch(function (error) {
        console.error(error);
    });
