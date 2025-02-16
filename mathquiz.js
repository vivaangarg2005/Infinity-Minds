const knowledgeQuestions = [
    { question: "Who is known as the 'Father of Geometry'?", options: ["Archimedes", "Euclid", "Pythagoras", "Newton"], answer: "Euclid" },
    { question: "Which Greek mathematician is known for his work in conic sections?", options: ["Euclid", "Archimedes", "Ptolemy", "Apollonius"], answer: "Apollonius" },
    { question: "Which mathematician formulated the fundamental theorem of algebra?", options: ["Gauss", "Euler", "Newton", "Lagrange"], answer: "Gauss" },
    { question: "Who developed the first systematic method for solving quadratic equations?", options: ["Al-Khwarizmi", "Euclid", "Descartes", "Archimedes"], answer: "Al-Khwarizmi" },
    { question: "Which mathematician developed the concept of limits and continuity in calculus?", options: ["Newton", "Leibniz", "Cauchy", "Fourier"], answer: "Cauchy" },
    { question: "Which famous mathematician developed the binomial theorem?", options: ["Pascal", "Newton", "Euler", "Fermat"], answer: "Newton" },
    { question: "Which mathematical field studies prime numbers and their properties?", options: ["Topology", "Algebra", "Number Theory", "Graph Theory"], answer: "Number Theory" },
    { question: "Which ancient method is used to find the greatest common divisor of two numbers?", options: ["Newton’s Method", "Euclidean Algorithm", "Lagrange’s Theorem", "Fourier Transform"], answer: "Euclidean Algorithm" },
    { question: "What is the branch of mathematics that deals with shapes, sizes, and properties of space?", options: ["Algebra", "Calculus", "Geometry", "Statistics"], answer: "Geometry" },
    { question: "Which theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides?", options: ["Fermat's Theorem", "Euler’s Formula", "Pythagorean Theorem", "Gauss’s Law"], answer: "Pythagorean Theorem" }
  ];
  
  const triviaQuestions = [
    { question: "Which ancient Greek mathematician is credited with measuring the Earth's circumference using shadows?", options: ["Eratosthenes", "Ptolemy", "Euclid", "Archimedes"], answer: "Eratosthenes" },
    { question: "Which mathematician formulated the famous Last Theorem that remained unsolved for 358 years?", options: ["Carl Friedrich Gauss", "Pierre de Fermat", "Leonhard Euler", "Isaac Newton"], answer: "Pierre de Fermat" },
    { question: "Which Indian mathematician is known for his work on infinite series and continued fractions?", options: ["Aryabhata", "Srinivasa Ramanujan", "Brahmagupta", "Bhaskara I"], answer: "Srinivasa Ramanujan" },
    { question: "Which mathematician's famous 'Eureka!' moment led to the principle of buoyancy?", options: ["Euclid", "Pythagoras", "Archimedes", "Thales"], answer: "Archimedes" },
    { question: "Which mathematician introduced the concept of imaginary numbers (i = √-1)?", options: ["Euler", "Gauss", "Descartes", "Cardano"], answer: "Cardano" },
    { question: "Which mathematician's name is associated with a sequence that appears in nature, such as the arrangement of sunflower seeds?", options: ["Fibonacci", "Gauss", "Euler", "Pascal"], answer: "Fibonacci" },
    { question: "Which female mathematician was one of the first known scholars of mathematics in ancient history?", options: ["Hypatia", "Sophie Germain", "Ada Lovelace", "Emmy Noether"], answer: "Hypatia" },
    { question: "Which French mathematician and philosopher contributed significantly to probability theory and has a triangle named after him?", options: ["René Descartes", "Blaise Pascal", "Joseph Fourier", "Pierre-Simon Laplace"], answer: "Blaise Pascal" },
    { question: "Who is known for formulating the concept of mathematical groups, which became fundamental in abstract algebra?", options: ["Évariste Galois", "Joseph Fourier", "Carl Friedrich Gauss", "John von Neumann"], answer: "Évariste Galois" },
    { question: "Which famous Swiss mathematician made significant contributions to graph theory, including the Seven Bridges of Königsberg problem?", options: ["Gauss", "Euler", "Fermat", "Pascal"], answer: "Euler" }
  ];
  
  const optionLetters = ["A", "B", "C", "D"];
  let currentQuestionIndex = 0;
  let score = 0;
  let attemptedCount = 0; // New variable to track attempted questions
  let questions = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function startQuiz(mode) {
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    attemptedCount = 0; // Reset attempted questions count for a new quiz
    questions = mode === "knowledge" ? [...knowledgeQuestions] : [...triviaQuestions];
    shuffleArray(questions);
    loadQuestion();
  }
  
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
    questionElement.innerHTML = `${currentQuestion.question}`;
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
  
    // Increase the count of attempted (answered) questions
    attemptedCount++;
  
    if (selectedAnswer === correctAnswer) {
      quizResult.textContent = "✅ Correct!";
      quizResult.style.color = "green";
      updateScore(4);
      button.style.backgroundColor = "#1dd074";
      button.style.borderColor = "#008000";
    } else {
      quizResult.textContent = "❌ Incorrect!";
      quizResult.style.color = "red";
      updateScore(-1);
      button.style.backgroundColor = "#e84c4d";
      button.style.borderColor = "#8B0000";
  
      document.querySelectorAll(".grid-container button").forEach(btn => {
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
  
  function endQuiz() {
    showFinalScore();
  }
  
  function showFinalScore() {
    // Total possible score is now based on the number of questions attempted
    let totalPossible = attemptedCount * 4;
    document.getElementById("quiz").innerHTML = `
      <p style="font-size: 28px; font-weight: bold;">Your Final Score</p>
      <div class="score-circle">
        <div class="score-line"></div>
        <div class="score-text" style="font-size: 28px;">${score}<br> ${totalPossible}</div>
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
    attemptedCount = 0;
    shuffleArray(questions);
    document.getElementById("quiz").innerHTML = `
      <h2 id="question"></h2>
      <div id="options" class="grid-container"></div>
      <p id="quiz-result"></p>
      <p>Score: <span id="score">0</span></p>
      <button id="next-btn" onclick="nextQuestion()">Next</button>
      <button id="end-btn" onclick="endQuiz()">End Quiz</button>
    `;
    loadQuestion();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quiz").style.display = "none";
  });
  