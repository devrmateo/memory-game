/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
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
let moves = 0;

function openCard(card, list) {
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
        incrementCounter();
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

function incrementCounter () {
    moves +=1;
    const moveCounter = document.querySelector('.moves');
    let text = '';
    if (moves === 1) {
        text = 'move';
    } else {
        text = 'moves';
    }
    moveCounter.innerHTML = moves + ' ' + text;

    if (moves === 15) {
        removeStars();
    }
    if (moves === 25) {
        removeStars();
    }
    return moves;
}

function removeStars () {
    let star = document.querySelector('.stars i');
    star.remove();
}

let intervalId;
let time = 0;
function startTimer (e) {
    intervalId = setInterval(function () {
        time++;
        displayTimer(time);
    }, 1000);

}

function stopTimer () {
    clearInterval(intervalId);
}

function displayTimer (time) {
    const timerField = document.querySelector('.timer');
    let formattedTime = formatTime(time);
    timerField.innerHTML = formattedTime;
}

function formatTime (timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    let formattedTime;
    seconds = padSeconds(seconds);
    if (minutes >= 1) {
        formattedTime = minutes + ':' + seconds;
    } else {
        formattedTime = seconds + ' seconds';
    }
    return formattedTime;
}

function padSeconds(timeInSeconds) {
    let string = timeInSeconds.toString();
    string = string.padStart(2, '0');
    return string;
}

function allCardsMatch (currentValue) {
    return currentValue.classList.contains('match');
}

function runModal () {
    const modal = document.querySelector('dialog');
    const heading = modal.firstElementChild;
    const closeButton = heading.nextElementSibling;
    const modalDiv = closeButton.nextElementSibling;
    const timeField = document.querySelector('.time');
    const starsField = document.querySelector('.stars');
    const movesField = document.querySelector('.moves');

    heading.textContent = 'Congratulations!'
    timeField.textContent = formatTime(time);
    modal.showModal();
    closeButton.addEventListener('click', function() {
        modal.close();
    })
}

runModal();

function runGame () {
    shuffleCards();
    deck.addEventListener('click', startTimer, {once: true});
    deck.addEventListener('click', function(e) {
    let card = e.target;
    if (card.classList.contains('card') && !card.classList.contains('open') && !card.classList.contains('show')) {
        openCard(card, openCards);
        addCardToList(card);
        checkForMatch(openCards);
        if (cardsArray.every(allCardsMatch) === true) {
            stopTimer();
            runModal();
        }
        }
    });
}

runGame();




