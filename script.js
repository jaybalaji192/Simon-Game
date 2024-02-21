var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var start = true

var key = "High Score";
var previousScore = localStorage.getItem(key);

const buttonColors = ['red', 'blue', 'green', 'yellow'];

$("h2").text("HighScore :"+previousScore);


function newSequence() {
    $("h1").text("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    // var e = 
    $("." + randomChosenColor).hide().fadeIn();
    var a = new Audio("sounds/" + randomChosenColor + ".mp3");
    a.play();
    // console.log(e);
    gamePattern.push(randomChosenColor);
    level++;
    start = false;
}

$(".btn").click(function (e) {
    var currid = e.target.getAttribute("id");
    updateUser(currid);
});

$(document).keypress(function (e) {
    switch (e.key) {
        case 'Enter':
            if (start) {
                newSequence();
            }
            break;
        case 'w':
            updateUser('green');
            break;
        case 'a':
            updateUser('yellow');
            break;
        case 's':
            updateUser('blue');
            break;
        case 'e':
            updateUser('red');
            break;

        default:
            break;
    }
});

function updateUser(id) {
    userClickedPattern.push(id);
    var a = new Audio("sounds/" + id + ".mp3");
    a.play();
    animatePress(id)
    checkAnswer(userClickedPattern.length - 1);
}

function animatePress(id) {
    $("#" + id).addClass("pressed");
    setTimeout(() => {
        $("#" + id).removeClass("pressed");

    }, 100);
}

function checkAnswer(lvl) {
    if (gamePattern[lvl] === userClickedPattern[lvl]) {
        console.log("Success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                newSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        var g = new Audio("sounds/wrong.mp3");
        g.play();


        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var currentScore = level;
        if (previousScore < currentScore) {
            localStorage.setItem(key, currentScore);
        }

        $("h1").text("Game Over! Press Enter to play again");

        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    start = true;
}
