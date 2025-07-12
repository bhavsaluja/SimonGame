var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
started = false

$("h1").click(function(){
    if (!started){
        $("h1").text("Level " + level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    var randomNumber = Math.round(Math.random() * 3) 
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    level++
    $("h1").text("Level  "+level)
    userClickedPattern = []
}

function playSound(name){
    new Audio('sounds/' + name + '.mp3').play()
}

function animatePress(colour){
    $("#"+colour).addClass("pressed")
    setTimeout(function(){
        $("#"+colour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    } else{
        $("h1").text("Game Over, Press Me to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}
