let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let skipBet = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerSumEl = document.getElementById("dealersum-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let newCardBtn = document.getElementById("newcardbtn")
let startGameBtn = document.getElementById("startgamebtn")
let playerEl = document.getElementById("player-el")
let playerBetEl = document.getElementById("playerbet-el")
let stopBtn = document.getElementById("stopbtn")
let dealerCards = []
let dealerCardsSum = 0
let playerBet = 0
let playerChips = 0

// Take player information and bet
let playerName = prompt("Enter your name:");
    playerChips = prompt("Enter your starting chips:");
    playerChips = Number(playerChips)
let player = {
    name: playerName,
    chips: playerChips
}

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
    newCardBtn.style.display = ""
    let dealerCard1 = getRandomCard()
    let dealerCard2 = getRandomCard()
    dealerCards = [dealerCard1, dealerCard2]
    dealerCardsSum = dealerCard1 + dealerCard2
    dealerCardsEl.textContent = "Cards: * " + dealerCards[1]
    dealerSumEl.textContent = "Sum: " + "+ " + dealerCards[1]
    stopBtn.style.display = "inline"
    renderGame()
}

// Bet function
function bet() {
    playerBet = prompt("Enter Your Bet: ")
    playerBetEl.innerText = "Bet: " + playerBet
    //player.chips = player.chips - playerBet  //Winning conditions need to be changed to reflect actual pot and money
    playerEl.textContent = player.name + ": $" + player.chips
}

// Render Game function
function renderGame() {
    if (skipBet === false){
        bet() 
    }

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
        player.chips += 3 * playerBet
        playerBetEl.innerText = "Bet: " + playerBet
        playerEl.textContent = player.name + ": $" + player.chips
        playerBet = 0
        skipBet = false
    } else if (sum === 21){
        stopGame()
    } else {
        message = "You're out of the game!"
        isAlive = false
        newCardBtn.style.display = "none"
        startGameBtn.style.display = ""
        startGameBtn.innerText = "RESET & START AGAIN"
        stopBtn.style.display = "none"
        player.chips = player.chips - playerBet
        playerBetEl.innerText = "Bet: " + playerBet
        playerEl.textContent = player.name + ": $" + player.chips
        playerBet = 0
        skipBet = false
    }
    messageEl.textContent = message
}

// Function to draw new card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        skipBet = true
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
        player.chips = player.chips + playerBet
        playerBet = 0
        playerBetEl.innerText = "Bet: " + playerBet
        playerEl.textContent = player.name + ": $" + player.chips
        skipBet = false
    } else if (sum === dealerCardsSum) {
        message = "It is a push, you get your money back"
        playerBetEl.innerText = `Bet: ${playerBet}`
        playerEl.textContent = player.name + ": $" + player.chips
        playerBet = 0
        skipBet = false
    } else if (dealerCardsSum > 21){
        message = "Dealer got bust, you won!"
        player.chips = player.chips + playerBet
        playerBet = 0
        skipBet = false
    } else if (sum < dealerCardsSum){
        message = "Dealer won, do you wish to play another round?"
        player.chips = player.chips - playerBet
        playerBet = 0
        playerBetEl.innerText = "Bet: " + playerBet
        playerEl.textContent = player.name + ": $" + player.chips
        skipBet = false
    }
    messageEl.textContent = message

    skipBet = false
    newCardBtn.style.display = "none"
    startGameBtn.style.display = ""
    startGameBtn.innerText = "RESET & START AGAIN"
    stopBtn.style.display = "none"
}