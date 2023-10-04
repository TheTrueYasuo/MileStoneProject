const questions = [
    {
        question: 'Who is the boy who lived?',
        choices: ['Ron Weasley', 'Harry Potter', 'Draco Malfoy', 'Neville Longbottom'],
        answer: 1 // Index of the correct answer in the choices array
    },
    // ... (other questions)
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

const questionElement = document.querySelector('#question');
const choiceElements = Array.from(document.querySelectorAll('.choice-text'));
const progressTextElement = document.querySelector('#progressText');
const scoreTextElement = document.querySelector('#score');
const progressBarFullElement = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressTextElement.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFullElement.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    questionElement.innerText = currentQuestion.question;

    choiceElements.forEach((choice, index) => {
        choice.innerText = currentQuestion.choices[index];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

const handleChoiceClick = e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
};

const incrementScore = num => {
    score += num;
    scoreTextElement.innerText = score;
};

// Event listeners for choice clicks
choiceElements.forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
});

startGame();