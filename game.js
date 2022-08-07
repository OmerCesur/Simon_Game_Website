var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var isGameTrue = true;

var time = 750;
var clicktime = 750;

var started = false;
var clickerEnable=true;



$("body").keypress(function () {
    if (!started) {
        setTimeout(nextSequence,750);
        levelpass();
        started = true;
    }
});


$(".btn").click(function () {
if(clickerEnable){
    clickerEnable=false;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(gamePattern.length);
}
});


function sequence() {
    
    for (var i = 0; i < gamePattern.length; i++) {
        setTimeout(animation, time, gamePattern[i]);
        setTimeout(playSound, time, gamePattern[i]);
        time = time + 750;
    }
};

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animation(randomChosenColour);
    playSound(randomChosenColour);

};


function playSound(name) {
    var sound = new Audio( name + ".mp3");
    sound.volume = 0.2;
    sound.play();
};

function animation(colour) {
    $("#" + colour).fadeToggle("fast").fadeToggle("fast");
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};


function levelpass() {
    level++;
    $("h1").html("Level " + level);
    userClickedPattern = [];
    
};



function checkAnswer(currentLevel) {
    for (var i = 0; i < currentLevel; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            isGameTrue = true;
        }
        else {
            isGameTrue = false;
            break;
        }
    }
    if (isGameTrue) {

        sequence();
        setTimeout(nextSequence, time);
        levelpass();
        setTimeout(function(){clickerEnable=true;},time);
        time = 750;
        
    } else {
        if (userClickedPattern.length === gamePattern.length) {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").html("Game over! Press any key to try again.");
            started = false;
            level = 0;
            gamePattern = [];
            isGameTrue = true;
            clickerEnable=true;
        }
        clickerEnable=true;
    }
};
