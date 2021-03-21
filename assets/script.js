var questionPool = [
    {
        question: "JavaScript is a _____-side programming language.",
        choices: ["Client", "Server", "Both", "Neither"],
        answer: "Both"
    },
    {
        question: "Which of the following will write text in an alert box?",
        choices: ["alertBox('text')", "alert(text)", "msgAlert('text')", "alert('text')"],
        answer: "alert('text')"
    },
    {
        question: "What will this code return? boolean(1<8)",
        choices: ["7", "True", "9", "false"],
        answer: "True"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<scripting>", "<script>", "<java>"],
        answer: "<script>"
    }

]


var timerCount = 60;
var containerEl = document.querySelector("#container");
var quizEl = document.querySelector("#answers");
var questionsEl = document.querySelector("#questions");
var startB = document.querySelector('#start');
var beginEl = document.querySelector('#begin');
var timeDisplay = document.querySelector('.timer-count');
var timer;
var counter = 0;
var headOne = document.querySelector("#headOne");

function setTime() {
    beginEl.innerHTML = "";
    headOne.innerHTML = "";
    timer = setInterval(function () {
        timerCount--;
        timeDisplay.textContent = timerCount;
        if (timerCount <= 0) {
            // clearInterval(timer);
            endgame();
        }
    }, 1000);
    questions();
}


function buildButton(i) {
    const button = document.createElement("button");
    button.innerText = i;
    var result;
    if (questionPool[counter].answer === i) {
        result = true
    } else {
        result = false
    }
    button.setAttribute("result", result)
    button.addEventListener("click", function () {
        if (result === true) {
            questions();
        } else {
            timerCount = timerCount - 10;
            questions();
        }
    }
    )
    return button;
}





function questions() {

    quizEl.innerHTML = "";
    if (counter < questionPool.length) {
        questionPool[counter].choices.map((i) => (
            quizEl.append(buildButton(i))
        ))
        questionsEl.innerHTML = questionPool[counter].question;
        counter++;
    } else {
        endgame();

    }
}

//If you waited the full timer then started proceeded to miss all the questions you could get a -40 score, and at that point you deserve it. I could put in a set score to 0 if < 0 though.
function endgame() {
    quizEl.innerHTML = ""
    clearInterval(timer);
    if (timerCount < 0) {
        timerCount = 0;
    }
    questionsEl.textContent = "score: " + timerCount;
    var initials = document.createElement("input");
    initials.type = "text";
    initials.id = ("initialForm");
    quizEl.appendChild(initials);

    var playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.classList.add("againButton");
    beginEl.appendChild(playAgain);
    var submitScore = document.createElement("button");
    submitScore.textContent = "Submit score";
    submitScore.classList.add("submit");
    beginEl.appendChild(submitScore);
}

function userName() {
    var playerInitials = document.getElementById("initialForm").value;
    var initialScores = { "name": playerInitials, "score": timerCount };
    const totalScores = [];
    const getScores = JSON.parse(localStorage.getItem("highscores"));
    if (getScores) {
        getScores.push(initialScores);
        localStorage.setItem("highscores", JSON.stringify(getScores));
    } else {
        totalScores.push(initialScores);
        localStorage.setItem("highscores", JSON.stringify(totalScores));
    }


    location.assign("assets/scores.html");
}

const highScoresDisplay = document.querySelector("#highScores");
function newpage() {
    init();
}




function init() {
    if (window.location.href.indexOf('scores') > -1) {
        console.log('test');
        var currentScores = JSON.parse(localStorage.getItem("highscores"));
        const sortArr = currentScores.sort((a, b) => b.score - a.score)
        sortArr.forEach(obj => {
            highScoresDisplay.innerHTML += `<div class="col-6">${obj.name}</div>
            <div class="col-6">${obj.score}</div>`;
        })
    }

}

init();

beginEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("againButton")) {
        location.reload();
    }
    if (event.target.classList.contains("submit")) {
        userName();
    }
});

































startB.addEventListener("click", setTime);