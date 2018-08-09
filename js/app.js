//Global variables
const cards = document.querySelectorAll('.card');
let openCards = [];
const deck = document.querySelector('.deck');
let moves = 0;
let intervalId;
let time = 0;
const resetButton = document.querySelector('.fa-repeat');

//Create a list that holds all of the cards.

const cardsArray = Array.from(cards);
function shuffleCards () {
    //Use included shuffle function to shuffle deck.
    shuffle(cardsArray);
    for (card of cardsArray) {
        deck.appendChild(card);
    }
}

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

function openCard(card, list) {
//Only open two cards at a time.
    if (list.length < 2) {
        card.classList.add('open');
        card.classList.add('show');
    }
}

function addCardToList (card) {
//Add card to a list of 'open' cards.
    if (!card.classList.contains('match')) {
        openCards.push(card);
    }
}

function checkForMatch (list) {
//if the list already has another card, check to see if the two cards match
    if (list.length === 2) {
        //Increase move counter by 1.
        moves +=1;
        getMoves();
        removeStars();
        let firstCard = list[0];
        let secondCard = list[1];
        if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');
            //Reset the list of open cards to 0 for the next move.
            openCards = [];
        } else {
            setTimeout(function () {
                //If the cards don't match, delay briefly before closing them, so the user can see what they are.
                firstCard.classList.remove('open', 'show');
                secondCard.classList.remove('open', 'show');
                //Reset the list of open cards.
                openCards = [];
            }, 1000);
        }
    }
}

function getMoves () {
    const moveCounter = document.querySelector('.moveCounter');
    let text = '';
    if (moves === 1) {
        text = 'move';
    } else {
        text = 'moves';
    }
    moveCounter.innerHTML = moves + ' ' + text;
    return moves;
}

function removeStars () {
    const star = document.querySelector('.stars li');
    //Once the user hits 15 moves, remove a star; then again at 25 moves.
    if (getMoves() === 15 || getMoves() === 25) {
        star.remove();
    }
}

function getStars () {
//Get the amount of stars a user currently has.
    const nodeList = document.querySelectorAll('.stars li');
    const starList = Array.from(nodeList);
    return starList;
}

function startTimer () {
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
//Include a '0' before the seconds from 0 to 9 ('01' instead of '1').
    let string = timeInSeconds.toString();
    string = string.padStart(2, '0');
    return string;
}

function allCardsMatch (currentValue) {
    return currentValue.classList.contains('match');
}

function runModal () {
//Use predefined modal functions to open and close the modal dialog box.
    const modal = document.querySelector('dialog');
    const heading = document.querySelector('h3');
    const modalDiv = document.querySelector('modalFieldsDiv');
    const timeField = document.querySelector('.timeField');
    const starsField = document.querySelector('.starsField');
    const movesField = document.querySelector('.movesField');
    const closeButton = document.querySelector('.close');
    const playAgainButton = document.querySelector('.play');
    timeField.textContent = formatTime(time);
    starsField.textContent = getStars().length;
    movesField.textContent = getMoves();
    modal.showModal();
    closeButton.addEventListener('click', function() {
        modal.close();
    })
    playAgainButton.addEventListener('click', function() {
        modal.close();
        resetGame();
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame () {
//Reset game back to initial state, with all cards face down, and the timer and number of stars reset.
    for (card of cardsArray) {
        card.classList.value = 'card';
    }
    time = 0;
    moves = 0;
    const movesField = document.querySelector('.moveCounter');
    movesField.textContent = '0 moves';
    let numberOfStars = getStars().length;
    let maxStars = 3; //This is the number of stars a user starts out with.
    if (numberOfStars < maxStars) {
        const parent = document.querySelector('.stars');
        let html = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
        parent.innerHTML = html;
        getStars().length = 3; //Reset the number of stars to 3.
    }
    displayTimer(time);
    stopTimer();
    runGame();
}

function runGame () {
    shuffleCards();
    //Only start the timer on the first click.
    deck.addEventListener('click', startTimer, {once: true});
    //Set up the event listener for a card.
    deck.addEventListener('click', function(e) {
    //If card is clicked, 'open' it, add it to a list of 'open' cards and check for a match.
    let card = e.target;
    if (card.classList.contains('card') && !card.classList.contains('open') && !card.classList.contains('show')) {
        openCard(card, openCards);
        addCardToList(card);
        checkForMatch(openCards);
        if (cardsArray.every(allCardsMatch) === true) {
        //If all cards are matched, then the game is over.  Stop timer and show modal dialog congratulating user on winning the game.
            stopTimer();
            runModal();
        }
        }
    });
}

runGame();




