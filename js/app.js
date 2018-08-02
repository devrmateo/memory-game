/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
console.log(cardsArray);
function shuffleCards () {
    shuffle(cardsArray);
    for (card of cardsArray) {
        deck.appendChild(card);
    }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */

let openCards = [];
let deck = document.querySelector('.deck');
deck.addEventListener('click', function(e) {
    let card = e.target;
    if (card.classList.contains('card') && !card.classList.contains('open') && !card.classList.contains('show')) {
        openCard(card, openCards);
        addCardToList(card);
        checkForMatch(openCards);
    }
});

function openCard(card, list) {
    console.log(list.length);
    if (list.length < 2) {
        card.classList.add('open');
        card.classList.add('show');
    }
}

 /*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
 function addCardToList (card) {
    if (!card.classList.contains('match')) {
        openCards.push(card);
    }
}
 /*
 *  - if the list already has another card, check to see if the two cards match
 */
function checkForMatch (list) {
    if (list.length === 2) {
        let firstCard = list[0];
        let secondCard = list[1];
        if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            openCards = [];
        } else {
            setTimeout(function () {
                firstCard.classList.remove('open', 'show');
                secondCard.classList.remove('open', 'show');
                openCards = [];
            }, 1000);
        }
    }
}
 /*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 */
/* Taken care of throught the above functions.*/
 /*
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
/*
*/
/* Taken care of throught the above functions.*/
/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function runGame () {
    shuffleDeck();

 }







