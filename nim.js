/**
 * Created by wkerrebijn on 19-5-2017.
 */
var readline, rl;
var lucifers;

function askUserMove() {
    printLucifers();
    rl.question("Hoeveel lucifers wil je nemen?\n> ", checkLucifersInput);
}

function checkLucifersInput(input) {
    if(input%1 == 0 && input > 0 && input <= Math.min(lucifers, 4)) {
        performUserMove(input);
    } else {
        askUserMove();
    }
}

function performUserMove(input) {
    lucifers = lucifers - input;
    determineLoser("user");
}

function performComputerMove() {
    var move;
    switch(lucifers%5) {
        case 0: move = 4; break;
        case 1: move = 1; break;
        case 2: move = 1; break;
        case 3: move = 2; break;
        case 4: move = 3; break;
    }
    printLucifers();
    lucifers = lucifers - move;
    console.log("Computer neemt " + move + " lucifers.");
    determineLoser("computer");
}

function printLucifers() {
    if(lucifers != 1) {
        console.log("\nEr liggen " + lucifers + " lucifers.");
    } else {
        console.log("\nEr ligt " + lucifers + " lucifer.");
    }
}

function determineLoser(player) {
    if(lucifers == 0) {
        if(player === "user") {
            console.log("\nJe hebt de laatste lucifer genomen.\nJe hebt verloren!");
        } else if(player === "computer") {
            console.log("\nComputer heeft de laatste lucifer genomen.\nComputer heeft verloren!");
        }
        rl.question("Opnieuw spelen? (J/N):\n> ", determineRestart);
    } else {
        if(player === "user") {
            performComputerMove();
        } else if(player === "computer") {
            askUserMove();
        }
    }
}

function determineRestart(answer) {
    if(answer.toLowerCase() == "j" || answer.toLowerCase() == "ja") {
        startGame();
    } else if(answer.toLowerCase() == "n" || answer.toLowerCase() == "nee") {
        console.log("Einde Spel!");
        rl.close();
        return;
    } else {
        rl.question("Onjuiste input\nOpnieuw spelen? (J/N):\n> ", determineRestart);
    }
}

function startGame() {
    readline = require('readline');
    rl = readline.createInterface(process.stdin, process.stdout);
    lucifers = 11;
    console.log("Game started with " + lucifers + " lucifers!");
    askUserMove();
}

startGame();
