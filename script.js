const cards = document.querySelectorAll('.memory-card');

function reverse(className) {
  className.forEach(el => {
    el.classList.add('flip');
  });
}

setTimeout(() => {
  reverse(cards)
}, 0);


function reverse2(className) {
  className.forEach(el => {
    el.classList.remove('flip');
  });
}

setTimeout(() => {
  reverse2(cards)
}, 1000);




let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

let count = 0

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards()
    count++
    if (count === 10) {
      let elemDiv = document.createElement('div');
      elemDiv.className = "aClassName";
      document.body.appendChild(elemDiv).textContent = "You Win";
    }
  } else {
    unflipCards()
  }

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));