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
var timeDisplay = document.querySelector('.timer-count');
var timer;
var counter = 0;


function setTime() {
    timer = setInterval(function() {
        timerCount--;
        timeDisplay.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
    questions();
}


function buildButton(i) {
    const button = document.createElement("button");
    button.innerText= i;
    var result;
    if (questionPool[counter].answer === i) {
        result = true
    } else {
        result = false
    }
    button.setAttribute("result", result)
    button.addEventListener("click", function() {
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

function endgame() {
    quizEl.innerHTML = ""
    clearInterval(timer);
    if (timerCount > 0) {
        questionsEl.textContent = "score: " + timerCount
    } else {
        questionsEl.textContent = "score: " + timerCount
    }
}



































startB.addEventListener("click", setTime);