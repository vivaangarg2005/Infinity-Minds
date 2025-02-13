// Smooth Scroll Effect for Internal Links
document.querySelectorAll('.navbar nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = event.target.getAttribute('href');
        
        // Allow external links like mathquiz.html to open normally
        if (targetId.startsWith("http") || targetId.includes("mathquiz.html")) return;
        
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

// Open Math Quiz in a New Tab When Clicking the Section
document.getElementById("mathquiz-section")?.addEventListener("click", () => {
    window.open("mathquiz.html", "_blank");
});

// Reveal Sections on Scroll Using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.content-section').forEach(section => observer.observe(section));

// Fun Facts Rotation
const facts = [
    "🧐 The number 0 wasn’t widely accepted for centuries! Ancient Greeks refused to consider it a number at all.",
    "🍕 A pizza with radius 'z' and height 'a' has volume Pi × z × z × a. (Yes, it's 'Pi-z-z-a'!)",
    "🃏 There are more ways to shuffle a deck of 52 cards than there are atoms in the universe! (52! ≈ 8.07 × 10^67)",
    "🔢 The number 666 appears in Pascal’s Triangle! (Check row 6, column 6, summing three numbers)",
    "🎂 You can cut a cake into 8 equal pieces with just three straight cuts!",
    "🔄 A ‘perfect number’ is a number that equals the sum of its divisors. The smallest is 6 (1+2+3=6)!",
    "🚀 If you fold a piece of paper 42 times, it would reach the Moon! (Exponential growth is crazy!)",
    "❄️ There’s a shape with infinite perimeter but finite area. It’s called the Koch Snowflake!",
    "✨ Leonhard Euler’s identity: e^(iπ) + 1 = 0 is called the 'most beautiful equation' in math!",
    "🤯 The sum of all natural numbers (1+2+3+4+...) is paradoxically equal to -1/12 in advanced math!"
];

const factText = document.getElementById("fact-text");
let factIndex = 0;

const showNextFact = () => {
    factText.style.opacity = "0"; // Fade out
    setTimeout(() => {
        factText.textContent = facts[factIndex]; // Change fact
        factIndex = (factIndex + 1) % facts.length;
        factText.style.opacity = "1"; // Fade in
    }, 1000);
};

window.addEventListener("load", () => {
    showNextFact();
    setInterval(showNextFact, 10000);
});
