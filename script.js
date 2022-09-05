'use strict';

const diceEl = document.querySelector('.dice');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let playing = true;

document.querySelector('#score--1').textContent = 0;
document.querySelector('#score--0').textContent = 0;
diceEl.classList.add('hidden');

//Rolling the dice functionality

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    if (diceNumber === 1) {
      diceEl.classList.remove('hidden');
      diceEl.src = 'dice-1.png';
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      if (activePlayer === 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
    } else {
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${diceNumber}.png`;
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    if (score[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      if (activePlayer === 0) {
        activePlayer = 1;
      } else {
        activePlayer = 0;
      }
      document.querySelector('.player--0').classList.toggle('player--active');
      document.querySelector('.player--1').classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  playing = true;
  score = [0, 0];
  currentScore = 0;
  diceEl.classList.add('hidden');

  for (activePlayer = 0; activePlayer < score.length; activePlayer++) {
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
  }
  activePlayer = 0;

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
});
