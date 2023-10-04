const question = document.querySelector('#questions');
const choices = Array.from(documents.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    },
    {
        question: 'Who is the boy who lived?',
        choice1: 'Ron Weasley',
        choice2: 'Harry Potter',
        choice3: 'Draco Malfoy',
        choice4: 'Neville Longbottom',
        answer: 2,
    }

]


const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score=0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }


    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100)%'

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length )
    currentQuestion = availableQuestions [questionsIndex]
    question.innerText = currentQuestion.qustion.question

    choices.forEach(choice => {
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion ['choice' + number]
    } )
    
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers =false
        const selctedChoice = e.target
        const selectAnswer = selctedChoice.dataset ['number']

        let classToApply = selectAnswer == currentQuestion.answer ? 'correct' :
        'incorect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selctedChoice.parentElement.classList.add(classToApply)

        setTimeout ( () => {
            selctedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion ()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startGame() 