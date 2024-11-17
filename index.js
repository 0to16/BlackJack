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
let dealerSumEl = document.getElementById("dealersum-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let newCardBtn = document.getElementById("newcardbtn")
let startGameBtn = document.getElementById("startgamebtn")
let playerEl = document.getElementById("player-el")
let stopBtn = document.getElementById("stopbtn")
let dealerCards = []
let dealerCardsSum = 0

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
    let dealerCard1 = getRandomCard()
    let dealerCard2 = getRandomCard()
    dealerCards = [dealerCard1, dealerCard2]
    dealerCardsSum = dealerCard1 + dealerCard2
    dealerCardsEl.textContent = "Cards: * " + dealerCards[1]
    dealerSumEl.textContent = "Sum: " + "+ " + dealerCards[1]
    stopBtn.style.display = "inline"
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
    } else if (sum === 21 && cards.length === 2) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        newCardBtn.style.display = "none"
        startGameBtn.style.display = ""
        startGameBtn.innerText = "RESET & START AGAIN"
    } else if (sum === 21){
        stopGame()
    } else {
        message = "You're out of the game!"
        isAlive = false
        newCardBtn.style.display = "none"
        startGameBtn.style.display = ""
        startGameBtn.innerText = "RESET & START AGAIN"
        stopBtn.style.display = "none"
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

// Function to stop drawing cards and decide winner
function stopGame() {

    while (dealerCardsSum < 16) {
        let newDealerCard = getRandomCard()
        dealerCardsSum += newDealerCard
        dealerCards.push(newDealerCard)
    }

    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
   
    dealerSumEl.innerText = "Sum: " + dealerCardsSum
    
    //Declare the winnings conditions
    if (sum > dealerCardsSum){
        message = "You have doubled your money!"
    } else if (sum === dealerCardsSum) {
        message = "It is a push, you get your money back"
    } else if (dealerCardsSum > 21){
        message = "Dealer got bust, you won!"
    } else if (sum < dealerCardsSum){
        message = "Dealer won, do you wish to play another round?"
    }
    messageEl.textContent = message

    //Add a winning or losing statement above the reset game button 
    //Betting feature

    newCardBtn.style.display = "none"
    startGameBtn.style.display = ""
    startGameBtn.innerText = "RESET & START AGAIN"
    stopBtn.style.display = "none"
}