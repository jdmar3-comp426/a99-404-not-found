function initUser(usern, emai, pass, handSum) {
    var user = {
        username: usern,
        email: emai,
        password: pass,
        hand: [],
        handVal: handSum
    }
}

function initHouse(handSum) {
    const house = {
        name: "House",
        hand: [],
        handVal: handSum
    }
}

function userTurn() {
    // if user selects stay --> houseTurn
    //if user selects hit --> userHit
}

function houseTurn() {
    if(house.handVal >= 17 ) {
        end()
    } else {
        var choice = Math.floor(Math.random() * 2);
        if(choice == 1){
            hitHouse()
        } else {
            end()
        }
    }
}

function updateHandScores(player) {
    var sum = 0;
    for(let i=0; i<player.hand.length; i++){
        sum = sum + player.hand[i].cardVal;
    }
    player.handVal = sum
}

function deal() {
    for(let i = 0; i<2; i++){
        user.hand.push(cardDeck.pop());
        house.hand.push(cardDeck.pop());
    }
    updateHandScores(user)
    updateHandScores(house)
}

function hitUser(){
    user.hand.push(cardDeck.pop());
    updateHandScores(user)
    if(user.handVal > 21){
        end()
    } else {
        userTurn()
    }
}

function hitHouse() {
    house.hand.push(cardDeck.pop());
    updateHandScores(house)
    if(house.handVal > 21){
        end()
    } else {
        houseTurn()
    }
}

function end() {
    const winString = compareHands();
    const scoreString = user.handVal + " - " + house.handVal
    // update user database record
    // option to start again
}

function compareHands() {
    if(user.handVal > house.handVal){
        if(user.handVal > 21){
            return "You lose. You went over 21!" 
        } else {
            return "You win!" 
        }
    } else {
        if(house.handVal > 21){
            return "You win!" 
        } else {
            return "You lose. The House beat you!" 
        }
    }
}

function startNewMatch(user) {
    initUser(user.username, user.email, user.password, 0, 0)
    initHouse(0, 0)
    newDeck();
    shuffleDeck();
    deal();
    userTurn();
}

var cardDeck = new Array();
var cardFaces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"]
var cardSuits = [1, 2, 3, 4]

function newDeck() {
    for(let i = 0; i<13; i++){
        for(let j = 0; j<4; j++){
            var cardVal = 0;
            if(i == 10 || i == 11 || i == 12){
            cardVal = 10;
            } else if(i == 13){
            cardVal = 11;
            } else {
            cardVal = cardFaces[i];
            }

            var card = {face: cardFaces[i], suit: cardSuits[j], value: cardVal}
            cardDeck.push(card);
        }
    }
}

function shuffleDeck(){
    for(let i = 0; i<208; i++){
        var spot1 = Math.floor(Math.random() * 53);  
        var spot2 = Math.floor(Math.random() * 53); 
        var holder = cardDeck[spot1]
        cardDeck[spot1] = cardDeck[spot2]
        cardDeck[spot2] = holder;
    }
}
