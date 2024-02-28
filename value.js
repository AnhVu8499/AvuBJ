import * as Deck from './deck.js';

function newFile() {
    const imgSrc = Deck.showDeck();
    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    document.getElementById("result").appendChild(imgElement);
  }
  