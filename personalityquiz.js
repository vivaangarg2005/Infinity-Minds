const questions = [
    { question: "How do you approach solving a complex problem?", options: ["Step-by-step, logically and systematically.", "By experimenting with different ideas and finding hidden connections.", "I rethink the problem from a completely new perspective.", "By looking at abstract patterns and applying theoretical knowledge."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "What kind of math excites you the most?", options: ["Geometry and spatial reasoning.", "Number theory and prime numbers.", "The mathematics behind physics and the universe.", "Abstract structures and logic."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "How do you prefer to work?", options: ["Alone, deeply focused on a problem.", "Discussing ideas with others and bouncing around thoughts.", "A mix of solitude and collaboration-I need both to think deeply.", "Immersing myself in theory and building on existing knowledge."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "What inspires you most?", options: ["Order, logic, and structure in the universe.", "The beauty of numbers and their secrets.", "The mystery of space, time, and reality.", "The infinite possibilities of mathematics."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "How do you handle failure?", options: ["I analyze my mistakes carefully and try again with precision.", "I take an intuitive approach, trying new angles until something works.", "I completely rethink the problem and challenge existing assumptions.", "I revisit theoretical foundations and refine my reasoning."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "Which quote resonates with you the most?", options: ["There is no royal road to geometry.", "Mathematics is the queen of the sciences.", "Imagination is more important than knowledge.", "To those who ask what the infinite means, let them look at the stars."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "What kind of legacy would you like to leave?", options: ["A timeless textbook that lays the foundation for future learning.", "Revolutionary discoveries in numbers that influence countless fields.", "A new way of understanding reality itself.", "A vast body of work spanning multiple mathematical fields."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "How do you feel about proofs?", options: ["They should be rigorous and logically airtight.", "The beauty of a proof matters just as much as its correctness.", "Proofs should help us understand deep truths about reality.", "A proof should be elegant, surprising, and widely applicable."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "If you were not a mathematician, what would you be?", options: ["An architect or engineer-still working with logic and precision.", "A philosopher or scientist-exploring the mysteries of the world.", "A theoretical physicist-unraveling the deepest secrets of the universe.", "A polymath-mastering multiple disciplines, from physics to art."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] },
    { question: "What is your ideal way to spend a day off?", options: ["Solving puzzles or reading about logic.", "Discovering patterns in nature or thinking about prime numbers.", "Stargazing and contemplating the nature of time.", "Experimenting with different ideas and writing down insights."], scores: ["Euclid", "Gauss", "Einstein", "Euler"] }
];

const scoreTracker = { "Euclid": 0, "Gauss": 0, "Einstein": 0, "Euler": 0 };
let currentQuestionIndex = 0;

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalResult();
        return;
    }
    
    document.getElementById("question").textContent = questions[currentQuestionIndex].question;
    document.getElementById("question-counter").textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = ""; 

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button"; 
        button.onclick = () => selectAnswer(index);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const selectedMathematician = questions[currentQuestionIndex].scores[index];
    scoreTracker[selectedMathematician]++;
    currentQuestionIndex++;
    loadQuestion();
}

function showFinalResult() {
    let bestMatch = Object.keys(scoreTracker).reduce((a, b) => scoreTracker[a] > scoreTracker[b] ? a : b);
    const resultData = {
        "Euclid": {
            text: "Euclid (The Father of Geometry)\nIf Euclid inspires you, you likely have a logical and methodical mindset. You value structure, clarity, and precision, preferring strong foundations before exploring new ideas.",
            image:"https://www.worldhistory.org/img/r/p/1500x1500/4139.jpg"
        },
        "Gauss": {
            text: "Carl Friedrich Gauss (The Prince of Mathematics)\nIf Gauss is your match, you are a natural problem solver with an intuitive grasp of numbers. You see hidden patterns and love discovering mathematical beauty in unexpected places.",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzjk5KCclLaIyK6pbt4kVj30pstiJhkGkpSLyArc8fkAGxwp0k1sZaDXoe7q2tdxKrnSSTdKvsyfNKIeAUy-zWZwH2Y6cSUcQQ7NULP0"
        },
        "Einstein": {
            text: "Albert Einstein (The Visionary Thinker)\nIf you got Einstein, you are an imaginative and deep thinker who challenges conventional wisdom. You see mathematics as a tool for understanding the universe and often think outside the box.",
            image:"https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg?crop=1.00xw:0.956xh;0,0.0437xh&resize=980:*"
        },
        "Euler": {
            text: "Leonhard Euler (The Prolific Genius)\nIf Euler is your result, you have an insatiable curiosity and love exploring multiple fields of mathematics. You're adaptable, analytical, and capable of making surprising connections between different areas.",
            image:"https://www.onthisday.com/images/people/leonhard-euler.jpg?w=360"
        }
        };
        document.getElementById("quiz").innerHTML = `
        <div id="result-container">
            <h2 id="result-header">You are most like: ${bestMatch}!</h2>
            <div id="result-content">
                <img id="result-photo" src="${resultData[bestMatch].image}" alt="${bestMatch}">
                <p id="result-text">${resultData[bestMatch].text}</p>
            </div>
            <div id="result-buttons">
                <button onclick="restartQuiz()" class="quiz-button">Restart Quiz</button>
                <button onclick="goHome()" class="quiz-button">Home</button>
            </div>
        </div>
    `;
    
}

function goHome() {
    window.location.href = "frontpage.html";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    Object.keys(scoreTracker).forEach(key => scoreTracker[key] = 0);

    document.getElementById("quiz").innerHTML = `
        <h2 id="question-counter" class="question-counter"></h2>
        <h2 id="question" class="question-text"></h2>
        <div id="options" class="grid-container"></div>
    `;

    loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
