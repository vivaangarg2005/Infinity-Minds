document.querySelectorAll('.navbar nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = event.target.getAttribute('href');

        if (targetId.startsWith("http") || targetId.includes("mathquiz.html") || targetId.includes("personalityquiz.html")) {
            return;
        }

        event.preventDefault();
        const targetElement = document.getElementById(targetId.substring(1));

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

document.getElementById("mathquiz")?.addEventListener("click", () => {
    window.open("mathquiz.html", "_blank");
});

document.getElementById("personality")?.addEventListener("click", () => {
    window.open("personalityquiz.html", "_blank");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.content-section').forEach(section => observer.observe(section));

const facts = [
    "🧐 The number 0 wasn’t widely accepted for centuries! Ancient Greeks refused to consider it a number at all.",
    "🍕 A pizza with radius 'z' and height 'a' has volume Pi × z × z × a. (Yes, it's 'Pi-z-z-a'!)",
    "🃏 There are more ways to shuffle a deck of 52 cards than there are atoms in the universe! (52! ≈ 8.07 × 10^67)",
    "🔢 The number 666 appears in Pascal’s Triangle! (Check row 6, column 6, summing three numbers)",
    "🚀 If you fold a piece of paper 42 times, it would reach the Moon! (Exponential growth is crazy!)",
    "❄️ There’s a shape with infinite perimeter but finite area. It’s called the Koch Snowflake!",
    "✨ Leonhard Euler’s identity: e^(iπ) + 1 = 0 is called the 'most beautiful equation' in math!",
    "🤯 The sum of all natural numbers (1+2+3+4+...) is paradoxically equal to -1/12 in advanced math!",
    "🔺 The Fibonacci sequence appears everywhere in nature, from pinecones to galaxies!",
    "🔢 2 is the only even prime number. Every other even number is divisible by 2!",
    "🧮 The word 'hundred' comes from the Old Norse word 'hundrath,' which actually meant 120!",
    "🎲 The probability of two people having the same birthday in a group of 23 is over 50%!",
    "🎶 Musical scales and chords are based on mathematical ratios and frequencies!",
    "🔄 A Möbius strip has only one surface and one edge—you can travel forever on it!",
    "🎲 The number 2520 is the smallest number divisible by all integers from 1 to 10!",
    "🎩 The game of chess has more possible positions than atoms in the observable universe!",
    "🌀 The golden ratio (1.618...) appears in art, nature, and even stock market trends!",
    "⚖️ The Pythagorean theorem (a² + b² = c²) is over 2,500 years old and still widely used today!",
    "📏 A googol is 10^100—a 1 followed by 100 zeros, way more than the number of atoms in the universe!",
    "🎰 A standard six-sided die has opposite faces that always add up to 7!",
    "📚 The number 73 is special—it's the 21st prime number, and its reverse (37) is the 12th prime!",
    "🌌 The number of grains of sand on Earth is estimated to be about 7.5 × 10^18, far less than the number of stars in the universe!",
    "💰 The number ‘e’ (≈ 2.718) is used in banking and finance for calculating compound interest!",
    "🧊 A Rubik's Cube has 43,252,003,274,489,856,000 possible positions but can always be solved in 20 moves or less!",
    "⚡ The Monty Hall problem is a probability puzzle that confuses even seasoned mathematicians!",
];

const factText = document.getElementById("fact-text");

const showNextFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factText.style.opacity = "0";
    setTimeout(() => {
        factText.textContent = facts[randomIndex];
        factText.style.opacity = "1";
    }, 1000);
};

window.addEventListener("load", () => {
    showNextFact();
    setInterval(showNextFact, 10000);
});
