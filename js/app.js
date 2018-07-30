/*
 * Create a list that holds all of your cards
 */


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
let deck = document.querySelector('.deck');
let openCards = [];
deck.addEventListener('click', function(e) {
    let card = e.target;
    if (card.classList.contains('card')) {
        toggleCard(card);
        let updatedList = addCardToList(card);
        cardsMatch(updatedList, card);
    }
});

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

 /*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
 function addCardToList (card) {
    if (card.classList.contains('open') && !openCards.includes(card) && openCards.length < 2) {
        openCards.push(card);
    }
    return openCards;
}
 /*
 *  - if the list already has another card, check to see if the two cards match
 */
function cardsMatch (list) {
    if (list.length === 2) {
        let firstCard = list[0];
        let secondCard = list[1];
        if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
            firstCard.classList.toggle('match');
            secondCard.classList.toggle('match');
            openCards = [];
        } else {
            setTimeout(function () {
                toggleCard(firstCard);
                toggleCard(secondCard);
                openCards = [];
            }, 1000);
        }
    }
 }
 /*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 */

 /*
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */







