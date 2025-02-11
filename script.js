// Quiz Questions
const questions = [
    { question: "Who is known as the 'Father of Geometry'?", options: ["Archimedes", "Euclid", "Pythagoras", "Newton"], answer: "Euclid" },
    { question: "What is the value of π (pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
    { question: "Which mathematician is famous for the Fibonacci sequence?", options: ["Fibonacci", "Gauss", "Euler", "Pascal"], answer: "Fibonacci" },
    { question: "Who developed the first systematic method for solving quadratic equations?", options: ["Al-Khwarizmi", "Euclid", "Descartes", "Archimedes"], answer: "Al-Khwarizmi" },
    { question: "What is the sum of the interior angles of a triangle?", options: ["90°", "180°", "270°", "360°"], answer: "180°" },
    { question: "Which famous mathematician formulated the laws of motion and universal gravitation?", options: ["Kepler", "Galileo", "Newton", "Leibniz"], answer: "Newton" },
    { question: "The number '0' was first treated as a number by which civilization?", options: ["Greek", "Egyptian", "Indian", "Roman"], answer: "Indian" },
    { question: "Who introduced the concept of imaginary numbers (i = √-1)?", options: ["Euler", "Gauss", "Descartes", "Cardano"], answer: "Cardano" },
    { question: "The Pythagorean Theorem applies to which type of triangle?", options: ["Equilateral", "Isosceles", "Right-angled", "Scalene"], answer: "Right-angled" },
    { question: "What is the formula for the area of a circle?", options: ["πr²", "2πr", "πd", "r²/2"], answer: "πr²" }
];

const optionLetters = ["A", "B", "C", "D"];
let currentQuestionIndex = 0;
let score = 0;

function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = score;
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const quizResult = document.getElementById("quiz-result");

    quizResult.textContent = ""; // Clear previous result
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `<strong>Question ${currentQuestionIndex + 1}/${questions.length}:</strong> <br> ${currentQuestion.question}`;

    // Clear previous options
    optionsElement.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.textContent = `${optionLetters[i]}. ${currentQuestion.options[i]}`;
        button.onclick = () => checkAnswer(currentQuestion.options[i], button);
        optionsElement.appendChild(button);
    }
}
function checkAnswer(selectedAnswer, button) {
    const quizResult = document.getElementById("quiz-result");
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Disable all options after selecting an answer
    document.querySelectorAll(".grid-container button").forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        quizResult.textContent = "✅ Correct!";
        quizResult.style.color = "green";
        updateScore(4);
        button.style.backgroundColor = "#1dd074"; // Light green for correct answer
        button.style.borderColor = "#008000"; // Darker green border for contrast
    } else {
        quizResult.textContent = `❌ Incorrect!`;
        quizResult.style.color = "red";
        updateScore(-1);
        button.style.backgroundColor = "#e84c4d"; // Light red for wrong answer
        button.style.borderColor = "#8B0000"; // Darker red border for contrast

        // Highlight the correct option in light green
        const buttons = document.querySelectorAll(".grid-container button");
        buttons.forEach(btn => {
            if (btn.textContent.includes(correctAnswer)) {
                btn.style.backgroundColor = "#1dd074"; // Light green for correct option
                btn.style.borderColor = "#008000";
            }
        });
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showFinalScore() {
    let totalScore = questions.length * 4;
    document.getElementById("quiz").innerHTML = `
        <p>Your Final Score</p>
        <div class="score-circle">
            <div class="score-line"></div>
            <div class="score-text">${score}<br> ${totalScore}</div>
        </div>
        <h2>Quiz Completed!</h2>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz").innerHTML = `
        <h2 id="question"></h2>
        <div id="options" class="grid-container"></div>
        <p id="quiz-result"></p>
        <p>Score: <span id="score">0</span></p>
        <button id="next-btn" onclick="nextQuestion()">Next</button>
    `;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
