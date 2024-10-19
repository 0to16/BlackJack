let playBtn = document.getElementById("play-btn")
let question = document.getElementById("question") 
let hitBtn
let dealerDraw = document.getElementById("dealer-draw")
let playerDraw = document.getElementById("player-draw")
let dealerTotal = document.getElementById("dealer-total")
let playerTotal = document.getElementById("player-total")
let result = document.getElementById("result")
let draw = 0 

function getNumber() {
    draw = Math.floor(Math.random() * 11) + 1;
}

function resetGame() {
    // Reset the player and dealer totals
    playerTotal.innerText = "0";
    dealerTotal.innerText = "0";

    // Clear the cards display
    playerDraw.innerText = "Your Cards: ";
    dealerDraw.innerText = "";

    // Clear the result message
    result.textContent = "";

    // Reset the state of start button and question
    playBtn.style.display ="";
    question.style.display ="";
}

function start() {
    playBtn.style.display ="none";
    question.style.display ="none";
}

function hit() {
    if (Number(playerTotal.innerText)>21) {
        resetGame();
    }
    getNumber();
    dealerDraw.innerText += " " + draw + " +";
    dealerTotal.innerText = Number(dealerTotal.innerText) + draw;
    getNumber();
    playerDraw.innerText += " " + draw + " +";
    playerTotal.innerText = Number(playerTotal.innerText) + draw;
    if (Number(playerTotal.innerText)>21) {
        result.textContent = "Better Luck Next Time";
    } else if (Number(playerTotal.innerText)>21) {
        result.textContent = "BLACKJACK! You tripled your money";
    }
}