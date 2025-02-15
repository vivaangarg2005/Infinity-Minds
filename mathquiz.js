const questions = [
    { question: "Who is known as the 'Father of Geometry'?", options: ["Archimedes", "Euclid", "Pythagoras", "Newton"], answer: "Euclid" },
    { question: "Which Greek mathematician is known for his work in conic sections?", options: ["Euclid", "Archimedes", "Ptolemy", "Apollonius"], answer: "Apollonius" },
    { question: "Which mathematician is famous for the Fibonacci sequence?", options: ["Fibonacci", "Gauss", "Euler", "Pascal"], answer: "Fibonacci" },
    { question: "Who developed the first systematic method for solving quadratic equations?", options: ["Al-Khwarizmi", "Euclid", "Descartes", "Archimedes"], answer: "Al-Khwarizmi" },
    { question: "Which mathematician introduced the method of exhaustion to calculate areas and volumes?", options: ["Euclid", "Archimedes", "Eratosthenes", "Pythagoras"], answer: "Archimedes" },
    { question: "Which famous mathematician formulated the laws of motion and universal gravitation?", options: ["Kepler", "Galileo", "Newton", "Leibniz"], answer: "Newton" },
    { question: "The number '0' was first treated as a number by which civilization?", options: ["Greek", "Egyptian", "Indian", "Roman"], answer: "Indian" },
    { question: "Who introduced the concept of imaginary numbers (i = √-1)?", options: ["Euler", "Gauss", "Descartes", "Cardano"], answer: "Cardano" },
    { question: "The Pythagorean Theorem applies to which type of triangle?", options: ["Equilateral", "Isosceles", "Right-angled", "Scalene"], answer: "Right-angled" },
    { question: "Which ancient mathematician is credited with approximating the value of π (pi)?", options: ["Euclid", "Pythagoras", "Archimedes", "Eratosthenes"], answer: "Archimedes" }
];


const optionLetters = ["A", "B", "C", "D"];
let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

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

    quizResult.textContent = "";
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `<strong>Question ${currentQuestionIndex + 1}/${questions.length}:</strong> <br> ${currentQuestion.question}`;
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
    document.querySelectorAll(".grid-container button").forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        quizResult.textContent = "✅ Correct!";
        quizResult.style.color = "green";
        updateScore(4);
        button.style.backgroundColor = "#1dd074";
        button.style.borderColor = "#008000";
    } else {
        quizResult.textContent = `❌ Incorrect!`;
        quizResult.style.color = "red";
        updateScore(-1);
        button.style.backgroundColor = "#e84c4d";
        button.style.borderColor = "#8B0000";

        const buttons = document.querySelectorAll(".grid-container button");
        buttons.forEach(btn => {
            if (btn.textContent.includes(correctAnswer)) {
                btn.style.backgroundColor = "#1dd074";
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
        <p style="font-size: 28px; font-weight: bold;">Your Final Score</p>
        <div class="score-circle">
            <div class="score-line"></div>
            <div class="score-text" style="font-size: 28px;">${score}<br> ${totalScore}</div>
        </div>
        <h2 style="font-size: 28px;">Quiz Completed!</h2>
        <button onclick="restartQuiz()" class="btn">Restart Quiz</button>
        <button onclick="goHome()" class="btn home-btn">Home</button>
    `;
}

function goHome() {
    window.location.href = "frontpage.html"; 
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(questions);
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
