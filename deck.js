const suits = ["clubs", "spades", "diamonds", "hearts"];
const values = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];    
let deck = [];
let hand = [];
let userCard = [];
let dealerCard = [];  
let hitClickCount = 0;
let startClickCount = 0;
let finalValue = 0;
let finalBotValue = 0;
let numCardsDrawn = 0;

// These feafures will (not) be displayed when loaded 
window.addEventListener('load', function() {  
  document.getElementById('suit-type').style.display = 'none';
  document.getElementById('hit-button').style.display = 'none';
  document.getElementById('stay-button').style.display = 'none';
  document.getElementById('reset-button').style.display = 'none';
  document.getElementById('dealer-hand').style.display = 'none';
  document.getElementById('user-hand').style.display = 'none';
  document.getElementById('win-condition').style.display ='none';
});

function cardArr() {
  let deck = []; //erase the deck before using
  for (let value of values) {
    let card = {
      name: value,
      suits: suits
    };
    deck.push(card);
  }
  return deck;
}

// Define values
function cardValue(value) {
  if (value == "ace") {
    value = 11;
  }
  else if (value == "jack" || value =="queen" || value =="king") {
    value = 10;
  }
  else {
    value = value;
  }
  return value;
}

// assign value to each cards
function setCardValue() {
  let deck = cardArr();
  let cards = [];
  for (let eachCard of deck) {
    let card = {
      name: eachCard.name,
      suits: eachCard.suits,
      value: cardValue(eachCard.name)
    };
    cards.push(card);
  }
  return cards;
}

// This function will print the whole 52 cards
function makeDeck(parentElement) {
  document.querySelectorAll('img').forEach(function(card) {
    card.remove();
  }); //This helps to remove the printed cards.
  let deck = cardArr();
  let cards = setCardValue();
  for (let i = 0; i < deck.length; i++) {
    for (let suit of deck[i].suits) {
      let cardElement = document.createElement("img");
      cardElement.id = "card-type";
      cardElement.src = `Deck/PNG-cards-1.3/${deck[i].name}_of_${suit}.png`;
      cardElement.dataset.value = cards[i].value; // Assign value to card image
      parentElement.appendChild(cardElement);
      //document.getElementById('win-condition').textContent = cardElement.dataset.value;
    }
  }
  // for (let card of deck) {
  //   for (let suit of card.suits) {
  //     let cardElement = document.createElement("img");
  //     cardElement.id = "card-type";
  //     cardElement.src = `Deck/PNG-cards-1.3/${card.name}_of_${suit}.png`;
    
  //     parentElement.appendChild(cardElement);
  //   }
  // }
}

function randCard() {
  let randV = Math.floor(Math.random() * values.length);
  let randS = Math.floor(Math.random() * suits.length);
  let randVal = values[randV];
  let randSuit = suits[randS];
  //let rCard = `Deck/PNG-cards-1.3/${randVal}_of_${randSuit}.png`; 
  let rCard = {
    name: randVal,
    suits: [randSuit],
    image: `Deck/PNG-cards-1.3/${randVal}_of_${randSuit}.png`,
    value: cardValue(randVal)
  }
  return rCard;
}

function getRandCard() {
  if (numCardsDrawn < 52) { // if there are still cards left in the deck
    let newRandCard = randCard();
    let newCard;
    do {
      newCard ={
        name: newRandCard.name,
        suits: newRandCard.suits,
        image: newRandCard.image,
        value: newRandCard.value
      }
    } while (hand.includes(newCard)); 
    hand.push(newCard); // add the new card to the hand
    numCardsDrawn++; // increment the number of cards drawn

    let cardElement = document.createElement("img");
    cardElement.id = "card-type";
    cardElement.src = newCard.image;
    return cardElement;
  }
}

function uStarterCard() {
  for (let i = 0; i < 2; i++) {
    let cardElement = getRandCard();
    userCard.push(cardElement);
    document.getElementById("user-hand").appendChild(cardElement);
  }
}

function dStarterCard() {
  for (let i = 0; i < 2; i++) {
    let cardElement = getRandCard();
    dealerCard.push(cardElement);
    document.getElementById("dealer-hand").appendChild(cardElement);
  }
}

// Button "Start the game"
function startGame() {
  document.querySelectorAll('img').forEach(function(card) {
    card.remove();
  }); // remove all cards before use
  startClickCount++;
  document.getElementById('hit-button').style.display = 'block';
  document.getElementById('stay-button').style.display = 'block';
  document.getElementById('reset-button').style.display = 'block';
  document.getElementById('dealer-hand').style.display = 'block';
  document.getElementById('user-hand').style.display = 'block';

  uStarterCard();
  dStarterCard();
  countValue();

  const userCardsElement = document.getElementById("user-hand");
  userCardsElement.classList.add("user-cards");
  for (let card of userCard) {
    const cardElement = document.createElement("div");
    cardElement.textContent = card;
  }

  const dealerCardsElement = document.getElementById("dealer-hand");
  dealerCardsElement.classList.add("dealer-cards");
  for (let card of dealerCard) {
    const cardElement = document.createElement("div");
    cardElement.textContent = card;
  }

  // Hide the button after getting the starter cards
  document.getElementById("start-button").style.display ="none";
  document.getElementById('suit-type').style.display = 'none';
}

function reset() {
  document.querySelectorAll('img').forEach(function(card) {
    card.remove();
  }); // remove all cards before use
  document.getElementById("start-button").style.display ="block";
  document.getElementById("reset-button").style.display ="none";
  document.getElementById("hit-button").style.display ="none";
  document.getElementById("stay-button").style.display ="none";
  document.getElementById('win-condition').style.display = 'none';
  document.getElementById('dealer-card').style.display = 'none';
  // set all the values back to 0
  hitClickCount = 0;
  startClickCount = 0;
  hand = [];
  numCardsDrawn = 0;
  handValue = 0;
  dealerValue = 0;
  userValue = 0;
  drawValue = 0;
}

// Button "Stay"
function stayCard() {
  document.getElementById("hit-button").style.display ="none";
  document.getElementById("stay-button").style.display ="none";
  // if (finalBotValue < 15) {
  //   dealerDrawCard();
  //   countValue();
  // }
  isWin(); 
}

// Button "Hit"
function hitCard() {
  hitBut = document.getElementById('hit-button');
  hitClickCount++;
  let cardElement = getRandCard();
  //hand.push(cardElement);
  document.getElementById('user-hand').appendChild(cardElement);
  countValue();
  if (hitClickCount === 3 || isBusted()){
    hitBut.style.display ="none";
    // also hide the stay button when hit 3 times
    document.getElementById('stay-button').style.display ="none";
    isWin();
  }
}

function dealerDrawCard() {
  let cardElement = getRandCard();
  for (let i = 0; i < 3; i++) {
    document.getElementById('dealer-hand').appendChild(cardElement);
    dealerCard.push(cardElement);
  }
}

function countValue() {
  let handValue = 0;
  let userValue = 0;
  let drawValue = 0;
  let dealerValue = 0;
  let userHand = hand.slice(0,2);
  let dealerHand = hand.slice(2,4);
  let drawHand = hand.slice(4);
  for (let hCard of userHand) {
    userValue += hCard.value;
  }
  for (let hCard of drawHand) {
    drawValue += hCard.value;
  }
  for (let hCard of dealerHand) {
    dealerValue += hCard.value;
  }
  // Check for Black Jack
  if (userHand === 21) {
    finalValue > finalBotValue;
    finalValue < 22;
    isWin();
  }
  handValue = userValue + drawValue;
  finalValue = handValue;
  finalBotValue = dealerValue;
  document.getElementById('win-condition').style.display ='block';
  document.getElementById('dealer-card').style.display ='block';
  document.getElementById('win-condition').textContent = handValue;
  document.getElementById('dealer-card').textContent = dealerValue;
  // if (handValue === 0) 
  //   document.getElementById('win-condition').style.display = 'block';
  // else
  //   document.getElementById('win-condition').style.display = 'block';
  //document.getElementById('win-condition').textContent = handValue;
}

function isBusted() {
  if (finalValue >= 22)
    return true;
}

function isWin() {
  if ((finalValue > finalBotValue) && (finalValue < 22) &&  (finalValue > 15)) 
    document.getElementById('win-condition').textContent ="You Win!";
  else if ((finalValue < finalBotValue) || (finalValue > 22) || (finalValue <= 15)) 
    document.getElementById('win-condition').textContent ="You Lose!";
  else 
    document.getElementById('win-condition').textContent ="Draw!";
}



// Below are functions to test the game
//This funciton is to test if the cardValue function is working
/*
function test() {
  let outputDiv = document.getElementById("test");
  let card1 = cardValue("ace");
  let card2 = cardValue("king");
  if (card1 < card2) {
    outputDiv.innerHTML += "right<br>";
  }
  else {
    outputDiv.innerHTML += "wrong<br>";
  }
}
*/

// Test if the deck exists
function showDeck() {
  let parentElement = document.body;
  makeDeck(parentElement);
}

function showClubs() {
  showDeck();

  let cards = document.querySelectorAll("img");
  cards.forEach(function(card) {
    if (!card.src.includes("clubs")) {
      card.style.display = "none";
    }
  });
}

function showSpades() {
  showDeck();
  
  let cards = document.querySelectorAll("img");
  cards.forEach(function(card) {
    if (!card.src.includes("spades")) {
      card.style.display = "none";
    }
  });
}

function showDiamonds() {
  showDeck();

  let cards = document.querySelectorAll("img");
  cards.forEach(function(card) {
    if (!card.src.includes("diamonds")) {
      card.style.display = "none";
    }
  });
}

function showHearts() {
  showDeck();

  let cards = document.querySelectorAll("img");
  cards.forEach(function(card) {
    if (!card.src.includes("hearts")) {
      card.style.display = "none";
    }
  });
}
