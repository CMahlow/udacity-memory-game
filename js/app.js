/*
 * Create a list that holds all of your cards
 */
 let cards = ['diamond', 'paper-plane-o', 'anchor',
 'bolt','cube', 'leaf', 'bicycle','bomb','diamond',
 'paper-plane-o', 'anchor', 'bolt','cube', 'leaf',
 'bicycle','bomb'];

 // Add global variables
 let moves = 0;
 let clock = 0;
 let stars = 3;
 let timer;
 let timeCounter = 0;
 let openCards = [];

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
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //Start game when the DOM content loaded
$(document).ready(function() {
  startGame();
 });

$('.restart').on('click', restart);


// Reset the game
function restart() {
  location.reload();

  // Start the Game function
function startGame(){
  let newCards = shuffle(cards);
  let deck = $('.deck');
  $('.card').remove();
  for (let i = 0; i < 16; i++){
    deck[0].innerHTML+= '<li class="card"></li>';
  }
  let list = $('.card');
  for (let i = 0; i < 16; i++){
    list[i].innerHTML += '<i class="fa fa-' + newCards[i] + '"></i>';
  }
  clickCard();
}
//Add Clock function
function startClock(){
  timer = setInterval(function() {
    clock++;
    $('.timer').text(clock + ' seconds');
  }, 1000);
}
// Click function and match the card
function clickCard() {
  $('.card').click(function(){
    if (!$(this).hasClass('match') || $(this).hasClass('open')){
      $(this).addClass('open show');
      moves++;
      if (moves ==1){
        startClock();
      }
    openCards.push($(this));
    if (openCards.length % 2 == 0) {
      setTimeout(compareCards, 300);
    }
    }
    totalMoves(moves);
  });
}
//Check if two selected card match
function compareCards(){
  if (openCards[openCards.length - 2].html() == openCards[openCards.length - 1].html()) {
    openCards[openCards.length - 2].removeClass('open show');
    openCards[openCards.length - 2].addClass('match');
    openCards[openCards.length - 1].removeClass('open show');
    openCards[openCards.length - 1].addClass('match');

  } else {
    openCards[openCards.length - 1].removeClass('open show');
    openCards[openCards.length  -2].removeClass('open show');
    openCards.pop();
    openCards.pop();
  }
if (openCards.length == 16){
  finalTime = timer.innerHTML;
  clearInterval(timer);
  winMSG();

}
};

// SweetAlert https://sweetalert.js.org/guides/
function winMSG() {
  let exactMove = moves/2;
  let stars = $(".fa-star").length;
  swal({
    title: "Congrats, You just won!",
    text: "You got " + stars + " stars with " + exactMove + " moves, after " + clock + " seconds!",
    icon: "success",
    buttons: ["I'm done", "Play again"],
  })
  .then ((playAgain) => {
      if (playAgain) {
        location.reload();
      } else {
        return;
      }
    });
  }

//Add Function for moves and stars
function totalMoves(move){
stars = $('.fa-star');
noStars = $('.fa-star-0');
if (moves % 2 == 0){
let exactMove = move/2;
$('.moves').text(exactMove + ' moves');
}
if (moves == 0){
for (i = 0; i < noStars.length; i++){
  noStars[i].classList.add('fa-star');
  noStars[i].classList.remove('fa-star-o');
}
} else if (moves == 32){
stars[2].classList.add('fa-star-o');
stars[2].classList.remove('fa-star');
} else if (moves == 48) {
stars[1].classList.add('fa-star-o');
stars[1].classList.remove('fa-star');
}
}
