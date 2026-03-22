let levels = [
[
{ q: "Earth is round", a: true },
{ q: "Sun rises in west", a: false },
{ q: "2 + 2 = 4", a: true }
],
[
{ q: "Humans walked on Moon", a: true },
{ q: "Gold is metal", a: true },
{ q: "Penguins can fly", a: false }
],
[
{ q: "Sun is a star", a: true },
{ q: "Fire is cold", a: false },
{ q: "Humans have 3 hearts", a: false }
]
];

let level = 0;
let current = 0;
let score = 0;
let time = 10;
let timer;
let musicStarted = false;

let unlocked = localStorage.getItem("level") || 0;

// Splash
setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("levelScreen").style.display = "block";
    updateLevels();
}, 2000);

// 🔊 CLICK + START MUSIC (FIXED)
function playClick() {
    let click = document.getElementById("clickSound");
    let bg = document.getElementById("bgMusic");

    // play click
    if (click) click.play().catch(()=>{});

    // start bg music only once
    if (!musicStarted && bg) {
        bg.play().then(() => {
            musicStarted = true;
        }).catch(()=>{});
    }
}

// Level buttons
function updateLevels() {
    for (let i = 0; i < 3; i++) {
        let btn = document.getElementById("lvl" + i);

        if (i > unlocked) {
            btn.innerText = "🔒 Level " + (i + 1);
            btn.disabled = true;
        } else {
            btn.innerText = "Level " + (i + 1);
        }
    }
}

// Start level
function startLevel(lvl) {
    level = lvl;
    current = 0;
    score = 0;

    document.getElementById("levelScreen").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("level").innerText = "Level " + (level + 1);
    document.getElementById("score").innerText = 0;

    loadQuestion();
}

// Load question
function loadQuestion() {
    if (current >= levels[level].length) {
        endGame();
        return;
    }

    let q = levels[level][current];

    document.getElementById("question").innerText = q.q;
    document.getElementById("result").innerText = "";

    time = 10;
    document.getElementById("timer").innerText = time;

    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = time;

        if (time === 0) {
            clearInterval(timer);
            next();
        }
    }, 1000);
}

// Check answer
function checkAnswer(ans) {
    clearInterval(timer);

    if (ans === levels[level][current].a) {
        score++;
        document.getElementById("score").innerText = score;
        document.getElementById("result").innerText = "✅ Correct";
    } else {
        document.getElementById("result").innerText = "❌ Wrong";
    }

    setTimeout(next, 800);
}

// Next
function next() {
    current++;
    loadQuestion();
}

// End game
function endGame() {
    alert("Your Score: " + score);

    if (level == unlocked) {
        unlocked++;
        localStorage.setItem("level", unlocked);
    }

    goBack();
}

// Back
function goBack() {
    document.getElementById("game").style.display = "none";
    document.getElementById("levelScreen").style.display = "block";
    updateLevels();
}