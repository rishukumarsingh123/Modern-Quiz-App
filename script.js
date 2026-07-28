const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to add interactivity to a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to add an image to a web page?",
        answers: [
            { text: "&lt;image&gt;", correct: false },
            { text: "&lt;img&gt;", correct: true },
            { text: "&lt;picture&gt;", correct: false },
            { text: "&lt;src&gt;", correct: false }
        ]
    },

    {
        question: "Which CSS property is used to change the text color?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "foreground", correct: false }
        ]
    },

    {
        question: "Which CSS property is used to change the background color?",
        answers: [
            { text: "bg-color", correct: false },
            { text: "background-color", correct: true },
            { text: "color-background", correct: false },
            { text: "background", correct: false }
        ]
    },

    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        answers: [
            { text: "document.getElementById()", correct: true },
            { text: "document.getElement()", correct: false },
            { text: "document.selectId()", correct: false },
            { text: "document.getId()", correct: false }
        ]
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "variable", correct: false },
            { text: "let", correct: true },
            { text: "define", correct: false },
            { text: "varName", correct: false }
        ]
    },

    {
        question: "Which CSS layout system is commonly used for one-dimensional layouts?",
        answers: [
            { text: "Flexbox", correct: true },
            { text: "Floatbox", correct: false },
            { text: "Positionbox", correct: false },
            { text: "Tablebox", correct: false }
        ]
    },

    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Management", correct: false },
            { text: "Document Oriented Method", correct: false },
            { text: "Digital Object Model", correct: false }
        ]
    }
];
// DOM Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");

const questionCount = document.getElementById("question-count");
const progress = document.getElementById("progress");
const progressPercent = document.getElementById("progress-percent");
const liveScore = document.getElementById("live-score");

// Variables
let currentQuestionIndex = 0;
let score = 0;
// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = `Next <span>→</span>`;
    liveScore.innerHTML = score;
    showQuestion();
}
// Show Question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    // Question
    questionElement.innerHTML =
        questionNo + ". " + currentQuestion.question;
    // Question Counter
    questionCount.innerHTML =
        `Question ${questionNo} of ${questions.length}`;
    // Progress
    let percentage =
        (questionNo / questions.length) * 100;
    progress.style.width = percentage + "%";

    progressPercent.innerHTML =
        Math.round(percentage) + "%";
    // Create Answer Buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // Store correct answer
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        // Answer Click
        button.addEventListener("click", (e) => {
            const selectBtn = e.target;
            const isCorrect =
                selectBtn.dataset.correct === "true";
            // Correct Answer
            if (isCorrect) {
                selectBtn.classList.add("correct");
                score++;
                liveScore.innerHTML = score;
            }
            // Wrong Answer
            else {
                selectBtn.classList.add("incorrect");
            }
            // Show Correct Answer
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            // Show Next Button
            nextButton.style.display = "flex";
        });

    });
}
// Reset Answer Buttons
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(
            answerButtons.firstChild
        );

    }
}
// Show Final Score
function showScore() {
    resetState();
    questionElement.innerHTML =
        `🎉 Your Score: ${score} / ${questions.length}`;
    questionCount.innerHTML =
        "Quiz Completed!";
    progress.style.width = "100%";
    progressPercent.innerHTML = "100%";
    liveScore.innerHTML = score;
    nextButton.innerHTML =
        `Play Again <span>↻</span>`;
    nextButton.style.display = "flex";
}
// Handle Next Button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
// Next Button Click
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
// Start Quiz
startQuiz();
