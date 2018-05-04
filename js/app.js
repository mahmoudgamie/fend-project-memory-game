/*
 * Create a list that holds all of your cards
 */
const allCards = document.querySelectorAll('.card');
const myDeck = document.querySelector('.deck');
const no_of_moves = document.querySelector('.moves')
let moves_counter = 0;
let open_cards_counter = 0;


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
    debugger
    let openCards = [];
    const shuffledCards = shuffle(Array.from(allCards));
    const deck = document.querySelector('.deck');
    for (const card of shuffledCards) {
        deck.appendChild(card);
        card.addEventListener('click', function (event) {
            showCard(this);
            disableCard(this);
            addCard(this, openCards);
            match(this, openCards);
            moves_counter++;
            no_of_moves.innerHTML = moves_counter;
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
    card.classList.add('show');
}

function hideCard(card) {
    card.classList.remove('show');
}

function disableCard(card) {
    card.classList.add('disable-clicks');
}

function enableCard(card) {
    card.classList.remove('disable-clicks')
}

function lockCard(card) {
    card.classList.add('open');
    open_cards_counter++;
}

function addCard(card, cardList) {
    cardList.push(card);
}

function clearArray(array) {
    return array.splice(0, 2);
}

function youWin() {
    if (open_cards_counter === 16) {
        myDeck.classList.add('hide-deck');
        swal({
            title: "Congratulations! You Won!",
            text: "You clicked the button!",
            icon: "success",
            button: "Play Again!",
        }).then(function (value) {
            if (value === true) {
                myDeck.classList.remove('hide-deck')
                reloadGame();
            }
        });
    }
}

function match(card, cardList) {
    if (cardList.length > 1) {
        if (card.children[0].className === cardList[0].children[0].className) {
            lockCard(card);
            lockCard(cardList[0]);
            clearArray(cardList)
        } else {
            myDeck.classList.add('disable-clicks')
            setTimeout(function () {
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
