let player = {
    name: "Per",
    chips: 200
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let newCardBtn = document.getElementById("newcardbtn")
let startGameBtn = document.getElementById("startgamebtn")
let playerEl = document.getElementById("player-el")

// Render the player's name and chips in playerEl
playerEl.textContent = player.name + ": $" + player.chips

// Function to generate random cards
function getRandomCard() {
   let cardDrawn = Math.floor(Math.random() * 11) + 1
   return cardDrawn
}

// Start game function that calls render game function
function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    isAlive = true
    hasBlackJack = false
    renderGame()
    newCardBtn.style.display = ""
}

// Render Game function
function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
        newCardBtn.style.display = ""
        startGameBtn.innerText = "START GAME"
        startGameBtn.style.display = "none"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        newCardBtn.style.display = "none"
        startGameBtn.style.display = ""
        startGameBtn.innerText = "RESET & START AGAIN"
    } else {
        message = "You're out of the game!"
        isAlive = false
        newCardBtn.style.display = "none"
        startGameBtn.style.display = ""
        startGameBtn.innerText = "RESET & START AGAIN"
    }
    messageEl.textContent = message
}

// Function to draw new card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    } 
}
