// set up event listener to watch for interaction with start button
document.getElementById("startBtn").addEventListener("click", startNewGame);

/*
 * startNewGame()
 * input: -
 * output: -
 * dependencies: dependent on start button working, getting username from database
 * 
 * description: Initializes the game process once a user presses the start button.
 * This function initializes the user based on their account info, creates the "house"
 * which is automated, creates the card deck, shuffles the cards, and then deals 2 cards
 * to the user and the house. Finally, it calls userTurn() to begin gameplay.
 * 
 */
function startNewGame() {
    clearCardsUI();
    document.getElementById("gameState").innerHTML = "";
    document.getElementById('startBtn').value = 'Restart'
    user = initUser(getUserInfo()) // get from database!
    house = initHouse()
    document.getElementById("playerName").innerHTML = user.username;
    
    let cardDeck = [];
    cardDeck = newDeck();
    cardDeck = shuffleDeck(cardDeck);
    cardDeck = deal(user, house, cardDeck);
    userTurn(user, house, cardDeck);
}

/*
 * newDeck()
 * input: -
 * output: returns created card deck
 * 
 * description: called by startNewGame() to create deck of 52 standard cards.
 * manually setting up queen, jack, king, and ace values while preserving faces.
 * 
 */
function newDeck() {
    cardDeck = new Array();
    var cardFaces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"]
    var cardSuits = [1, 2, 3, 4]
    for(let i = 0; i<13; i++){
        for(let j = 0; j<4; j++){
            var cardVal;
            if(i == 9 || i == 10 || i == 11){
            cardVal = 10;
            } else if(i == 12){
            cardVal = 11;
            } else {
            cardVal = cardFaces[i];
            }

            var card = {face: cardFaces[i], suit: cardSuits[j], value: cardVal}
            cardDeck.push(card);
        }
    }
    return cardDeck;
}

/*
 * shuffleDeck(cardDeck)
 * input: takes in cardDeck
 * output: returns shuffled cardDeck
 * 
 * description: called by startNewGame() to simulate shuffling. iterates 4x the number of cards to
 * try to ensure all spots are changed at least once. A random spot within the deck is chosen, then
 * spots are switched to add randomized quality before dealing.
 * 
 */
function shuffleDeck(cardDeck){
    for(let i = 0; i<208; i++){
        var spot1 = Math.floor(Math.random() * 52);  
        var spot2 = Math.floor(Math.random() * 52); 
        var holder = cardDeck[spot1]
        cardDeck[spot1] = cardDeck[spot2]
        cardDeck[spot2] = holder;
    }
    return cardDeck;
}

/*
 * deal(user, house, cardDeck)
 * input: takes user and house object and created deck
 * output: returns cardDeck
 * 
 * description: called by startNewGame(). Deals two cards to each player and calls function to
 * render the cards in the UI. Calculates the initial sum for the players. Calls updateHandScores() to
 * update the UI to display initial score.
 * 
 */
function deal(user, house, cardDeck) {
    var userSum = 0;
    var houseSum = 0;
    user.handVal = 0;
    house.handVal = 0;
    for(let i = 0; i<2; i++){
        var userCard = cardDeck.pop();
        user.hand.push(userCard);
        var houseCard = cardDeck.pop();
        house.hand.push(houseCard);
        cardUI(userCard, user, house, 0);
        cardUI(houseCard, user, house, 1);
        userSum = userSum + user.hand[i].value;
        houseSum = houseSum + house.hand[i].value;
    }
    user.handVal = userSum
    house.handVal = houseSum
    updateHandScores(user, house)

    if(house.handVal > 21 || user.handVal > 21){
        end(user, house)
    }

    return cardDeck;
}


/*
 * initUser(name)
 * input: player's username for display in UI
 * output: user object
 * dependencies: dependent on username from database
 * 
 * description: Creates user object to reflect their username (which should display in UI) and
 * track their hand within the game. Sets their hand value (score) to 0 initially.
 * 
 */
function initUser(name) {
    var user = {
        username: name,
        hand: [],
        handVal: 0
    }
    var div_userHand = document.createElement("div");
    return user;
}

/*
 * initHouse()
 * input: -
 * output: house object
 * 
 * description: Creates house object to track their hand within the game. 
 * Sets their hand value (score) to 0 initially.
 * 
 */
function initHouse() {
    const house = {
        name: "House",
        hand: [],
        handVal: 0
    }
    var div_houseHand = document.createElement("div");
    return house;
}

/*
 * userTurn(user, house, cardDeck)
 * input: created user, house objects, cardDeck
 * output: -
 * dependencies: dependent on hit and stay buttons working
 * 
 * description: player's turn within the game. Allows them to select stay button and hit
 * or select stay, which advances the game to the house's turn.
 * 
 */
function userTurn(user, house, cardDeck) {
    document.getElementById("hitBtn").addEventListener("click", userAnon);
    document.getElementById("stayBtn").addEventListener("click", houseAnon);
}

/*
 * userAnon()
 * input: none
 * output: -
 * dependencies: dependent on hitUser function working
 * 
 * description: placeholder function without parameters that calls hitUser(user, house, cardDeck)
 * in order to allow the event listener to be cleared once the user turn has ended
 * 
 */
function userAnon() {
    hitUser(user, house, cardDeck)
}

/*
 * houseAnon()
 * input: none
 * output: -
 * dependencies: dependent on houseTurn function working
 * 
 * description: placeholder function without parameters that calls houseTurn(user, house, cardDeck)
 * in order to allow the event listener to be cleared once the user turn has ended
 * 
 */
function houseAnon() {
    houseTurn(user, house, cardDeck)
}

/*
 * hitUser(user, house, cardDeck)
 * input: created user, house objects and cardDeck
 * output: -
 * 
 * description: takes card from the deck and adds to user's hand. Then updates the score.
 * If the card makes the hand go over 21, initiates end process.
 * 
 */
function hitUser(user, house, cardDeck){
    var card = cardDeck.pop();
    user.hand.push(card);
    cardUI(card, user, house, 0)
    user.handVal += card.value
    updateHandScores(user, house)

    if(user.handVal > 21){
        end(user, house)
    } else {
        userTurn(user, cardDeck)
    }
}



/*
 * houseTurn(user)
 * input: created user, house objects, cardDeck
 * output: -
 * 
 * description: The house plays it safe, so they never hit if over 17 already. If under,
 * the choice is randomized. If they hit, they go to their own function. If not, the end process
 * is initiated.
 */
function houseTurn(user, house, cardDeck) {
    if (house.handVal < 17) {
        hitHouse(user, house, cardDeck);
    } else if (house.handVal < user.handVal) {
        const test = Math.random();
        if (test > 0.5) {
            hitHouse(user, house, cardDeck);
        } else {
            end(user, house)
        }
    } else {
        end(user, house)
    }
}

/*
 * hitHouse(user, house, cardDeck)
 * input: created user, house objects, cardDeck objects
 * output: -
 * dependencies: dependent on hit and stay buttons working
 * 
 * description: same as hitUser, but for the house. Initiates end
 * process for the game if the hit causes the house's hand to go over 21
 * 
 */
function hitHouse(user, house, cardDeck) {
    var card = cardDeck.pop();
    house.hand.push(card);
    cardUI(card, user, house, 1);
    house.handVal += card.value;
    updateHandScores(user, house);
    if(house.handVal > 21){
        end(user, house)
    } else {
        houseTurn(user, house, cardDeck)
    }
}

/*
 * end(user, house)
 * input: created user, house objects
 * output: -
 * needs: needs database for history of score
 * 
 * description: figures out who won by calling compareHands, then updates the
 * winning panel to reflect the end of the game.
 * 
 */
function end(user, house) {
    document.getElementById("hitBtn").removeEventListener("click", userAnon);
    document.getElementById("stayBtn").removeEventListener("click", houseAnon);
    const winString = compareHands(user, house);
    const scoreString = user.handVal + " - " + house.handVal
    document.getElementById("gameState").innerHTML = winString + "<br/>" + scoreString;
    document.getElementById("gameState").style.display = "inline-block";
    // update user database record
}

/*
 * compareHands(user, house)
 * input: created user, house objects
 * output: returns winning string for output in end(user, house) function above.
 * 
 * description: compares the user and house hands to figure out who won
 * 
 */
function compareHands(user, house) {
    if(user.handVal > house.handVal){
        if(user.handVal > 21){
            return "You lose. You went over 21!" 
        } else {
            return "You win!" 
        }
    } else {
        if(house.handVal > 21){
            return "You win!" 
        } else if(house.handVal == user.handVal) {
            return "Push."
        } else {
            return "You lose. The House beat you!" 
        }
    }
}


// UI stuff below

/*
 * updateHandScores(user, house)
 * input: created user, house objects
 * output: -
 * 
 * description: updates the scores for both players to the UI
 * 
 */
function updateHandScores(user, house) {
    document.getElementById("userScore").innerHTML = user.handVal;
    document.getElementById("houseScore").innerHTML = house.handVal;
}

/*
 * cardUI(card, user, house, num)
 * input: popped card object that is being dealt, user and house objects, number
 * indicating which player the card is going to- 0 indicates user, 1 indicates house
 * output: -
 * 
 * description: Creates card on the UI for users to see. Figures out the suit of the card
 * and assigns an icon and string. Then creates element to show the card
 * 
 * 
 */
function cardUI(card, user, house, num){
    var cardView = document.createElement("p");
    cardView.className = "card";

    var suitIcon = '';
    if(card.suit == 1){
        suitIcon = '&hearts;';
    } else if(card.suit == 2){
        suitIcon = '&spades;';
    } else if(card.suit == 3){
        suitIcon = '&diams;';
    } else {
        suitIcon = '&clubs;';
    }
   
    cardView.innerHTML = card.face + "<br/>" + suitIcon;
    
    if(num == 0){
        const uHand = document.getElementById("userHand");
        uHand.appendChild(cardView);
    } else {
        const hHand = document.getElementById("houseHand");
        hHand.appendChild(cardView);
    }
}

/*
 * clearCardsUI()
 * input: -
 * 
 * description: clears the cards in each players hands by removing the "card" children
 *              that were added to the html throughout the hand
 * 
 */

function clearCardsUI() {
    while (document.getElementById("userHand").firstChild) {
        document.getElementById("userHand").removeChild(document.getElementById("userHand").firstChild);
    }

    while (document.getElementById("houseHand").firstChild) {
        document.getElementById("houseHand").removeChild(document.getElementById("houseHand").firstChild);
    }
}


