/*
 * Create a list that holds all of your cards
 */
const allCards = document.querySelectorAll('.card');
const myDeck = document.querySelector('.deck');
const no_of_moves = document.querySelector('.moves');
const timer_display = document.querySelector('.timer');
let moves_counter = 0;
let open_cards_counter = 0;
let duration = 0;

// Redisplay on restart
const restart = document.querySelector('.restart');
restart.addEventListener('click', reloadGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards() {
    let openCards = [];
    const shuffledCards = shuffle(Array.from(allCards));
    const deck = document.querySelector('.deck');
    for (const card of shuffledCards) {
        deck.appendChild(card);
        card.addEventListener('click', function (event) {
            timer();
            showCard(this);
            disableCard(this);
            addCard(this, openCards);
            match(this, openCards);
            no_of_moves.innerHTML = moves_counter;
            rating()
            youWin();;
        });
    }
}

/*
TODO restart game with code instead of reload
*/
// function restartGame(e) {
//     e.preventDefault();
//     no_of_moves.innerHTML = 0;
//     open_cards_counter = 0;
//     moves_counter = 0;
//     for (const card of allCards) {
//         card.classList.remove('show', 'open', 'disable-clicks');
//     }    
//     displayCards();
// }

function reloadGame() {
    location.reload();
}

function showCard(card) {
    card.classList.add('show', 'open', 'fffff');
}

function hideCard(card) {
    card.classList.remove('show', 'open', 'fffff');
}

function disableCard(card) {
    card.classList.add('disable-clicks');
}

function enableCard(card) {
    card.classList.remove('disable-clicks')
}

function lockCard(card) {
    card.classList.add('animated', 'rubberBand')
    open_cards_counter++;
}

function addCard(card, cardList) {
    cardList.push(card);
}

function clearArray(array) {
    return array.splice(0, 2);
}

function getRating() {
    return document.getElementsByClassName('fa-star').length;
}



/* this function will run one time only from
 https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
*/
let timer = (function () {
    let executed = false;
    return function () {
        if (!executed) {
            executed = true;
            setInterval(function () {
                duration++
                timer_display.innerHTML = duration;
            }, 1000)
        }
    };
})();




function rating() {
    let lastStar = document.querySelector('.last-star');
    let middleStar = document.querySelector('.middle-star');
    let firstStar = document.querySelector('.first-star');
    if (moves_counter === 8) {
        lastStar.classList.remove('fa-star');
        lastStar.classList.add('fa-star-o');
    }
    if (moves_counter === 20) {
        middleStar.classList.remove('fa-star');
        middleStar.classList.add('fa-star-o');
    }
    if (moves_counter === 32) {
        firstStar.classList.remove('fa-star');
        firstStar.classList.add('fa-star-o'); 4
    }
}

function youWin() {
    if (open_cards_counter === 16) {
        myDeck.classList.add('hide');
        timer_display.classList.add('hide')
        swal({
            title: "Congratulations! You Won!",
            text: `Your score is ${moves_counter} moves in ${duration} Seconds
                    You got ${getRating()} ${getRating() > 1 ? 'Stars' : 'Star'}`,
            icon: "success",
            button: "Play Again!",
        }).then(function (value) {
            if (value === true) {
                reloadGame();
            }
        });
    }
}

function match(card, cardList) {
    if (cardList.length > 1) {
        moves_counter++;
        if (card.children[0].className === cardList[0].children[0].className) {
            lockCard(card);
            lockCard(cardList[0]);
            clearArray(cardList)
        } else {
            myDeck.classList.add('disable-clicks');
            setTimeout(function () {
                card.classList.add('animated', 'wobble');
                cardList[0].classList.add('animated', 'wobble');
            }, 500);
            setTimeout(function () {
                card.classList.remove('animated', 'wobble');
                cardList[0].classList.remove( 'animated', 'wobble');
                hideCard(card);
                hideCard(cardList[0]);
                enableCard(card);
                enableCard(cardList[0]);
                clearArray(cardList);
                myDeck.classList.remove('disable-clicks');
            }, 2000);
        }
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
displayCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
