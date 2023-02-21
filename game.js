// 0 is init
// 1 is ongoing
// 2 is end and waiting
let gameStatus = 0;


GREEN = 0;
RED = 1;
YELLOW = 2;
BLUE = 3;
let buttonSeq = []
let counter = 0;
let level = 1;




$(document).keydown(function () {
    // key pressed

    // init, start the game
    if (gameStatus === 0) {
        startGame();
    }

    // ongoing? ignore key
    if (gameStatus === 1) {
        return;
    }

    // end game? start new one
    if (gameStatus === 2) {
        startGame();
    }
});

$(".btn").click(function () {
    let id = $(this).attr("id");
    if (gameStatus === 0) {
        alert("press any key to start!");
        return;
    }
    $(this).addClass("pressed");
    setTimeout(()=>{
        $(this).removeClass("pressed");
    }, 35);



    if (gameStatus === 2) {
        wrong();
        return;
    }

    switch (id) {
        case "red":

            if (buttonSeq.at(counter) === RED) {
                if (counter === buttonSeq.length - 1) {
                    // win, enter next round
                    level++;
                    playGame();
                    return;
                }
                // else, have not finished round
                counter++;
                return;
            }
            gameStatus = 2;
            break;
        case "green":

            if (buttonSeq.at(counter) === GREEN) {
                if (counter === buttonSeq.length - 1) {
                    // win, enter next round
                    level++;
                    setTimeout(()=>{
                        playGame();
                    }, 1000)

                    return;
                }
                // else, have not finished round
                counter++;
                return;
            }

            gameStatus = 2;

            break;
        case "yellow":

            if (buttonSeq.at(counter) === YELLOW) {
                if (counter === buttonSeq.length - 1) {
                    // win, enter next round
                    level++;
                    setTimeout(()=>{
                        playGame();
                    }, 1000)
                    return;
                }
                // else, have not finished round
                counter++;
                return;
            }
            gameStatus = 2;
            break;
        case "blue":

            if (buttonSeq.at(counter) === BLUE) {
                if (counter === buttonSeq.length - 1) {
                    // win, enter next round
                    level++;
                    setTimeout(()=>{
                        playGame();
                    }, 1000)
                    return;
                }
                // else, have not finished round
                counter++;
                return;
            }
            gameStatus = 2;
            break;
    }

    if (gameStatus === 2) {
        // oops, lose it now
        endGame();
    }
})


function startGame() {
    // start a new game
    gameStatus = 1;
    setTimeout(()=>{
        playGame();
    }, 1000)
}


function playGame() {
    // show level
    $("#level-title").text(`Level ${level}`);
    // new button in this round
    let randomIndex = Math.floor(Math.random() * 4);
    switch (randomIndex) {
        case RED:
            buttonSeq.push(RED);
            buttonAnimation("red");
            break;
        case GREEN:
            buttonSeq.push(GREEN);
            buttonAnimation("green");
            break;
        case YELLOW:
            buttonSeq.push(YELLOW);
            buttonAnimation("yellow");
            break;
        case BLUE:
            buttonSeq.push(BLUE);
            buttonAnimation("blue");
            break;
    }
    // reset counter for this round
    counter = 0;

}


function wrong() {
    // change title
    $("#level-title").text("Game over, press any key to restart!");
    // play wrong and red out background
    let audio = new Audio(`sounds/wrong.mp3`);
    audio.play().catch(() => {
        console.log("having problems playing sound of wrong");
    });
    $("body").addClass("red");
    setTimeout(() => {
        $("body").removeClass("red");
    }, 100);
}

function buttonAnimation(buttonColor) {
    // play sound
    let audio = new Audio(`sounds/${buttonColor}.mp3`);
    audio.play().catch(() => {
        console.log("having problems playing sound");
    });
    // play fading
    let buttonObj = $("#" + buttonColor);
    buttonObj.animate({opacity: '50%'});

    // fading back
    setTimeout(() => {
        buttonObj.animate({opacity: "100%"});
    }, 100);

}


function endGame() {
    // show game over
    wrong();
    // clear game state
    level = 1;
    buttonSeq = [];
    counter = 0;
}