let questions = [
    {
        question: 'Who is the boy who lived?',
        choices: ['Ron Weasley', 'Harry Potter', 'Draco Malfoy', 'Neville Longbottom'],
        answer: 2 
    },
    {
        question: 'Who is the headmaster at Hogwarts?',
        choices: ['Severus Snape', 'Rubeus Hagrid', 'Dobby', 'Albus Dumbledore'],
        answer: 4 
    },
    {
        question: 'What kind of pet does Ron have?',
        choices: ['Rat', 'Owl', 'Cat', 'Dog'],
        answer: 1 
    },
    {
        question: 'What spell is used to fight dementors',
        choices: ['Expelliarmus', 'Accio', 'Alohomora', 'Patronus'],
        answer: 4 
    },
    {
        question: 'What is Lord Voldemort real name?',
        choices: ['Salazar Sletherine', 'Voldemort', 'Tom Riddle', 'Neville Longbottom'],
        answer: 3 
    },
    {
        question: 'How many horcruxes did veldermot create in total?',
        choices: ['5', '6', '8', '7'],
        answer: 3 
    },
    {
        question: 'Who is the half blood prince?',
        choices: ['Severus Snape', 'Harry Potter', 'Draco Malfoy', 'Neville Longbottom'],
        answer: 1 
    },
    {
        question: 'Which potions allows the person to transfrom appearence?',
        choices: ['Felix Felicis', 'Polyjuice potion', 'Skele-Gro', 'Wolfsbane potion'],
        answer: 2 
    },
    {
        question: 'Who is Harry Potter god father?',
        choices: ['Albus Dumbledore', 'Severus Snape', 'Sirus Black', 'Hagrid'],
        answer: 3 
    },
    {
        question: 'Who opended the chamber of secrets ?',
        choices: ['Ginny Weasley', 'Harry Potter', 'Draco Malfoy', 'Hagrid'],
        answer: 1 
    },
    {
        question: 'What is Consider a deadly hollow?',
        choices: ['Elder Wand', 'The Reserruction Stone', 'The Cloak of Invisibilty', 'All of the above'],
        answer: 4
    },
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
//checks if there are no more questions//
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
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
// Event Listener For Correct Answer//
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
//delay for new question//
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