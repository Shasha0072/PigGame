'use strict';

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore1EL = document.getElementById('current--0');
const currentScore2EL = document.getElementById('current--1');

score0EL.textContent = 0;
score1EL.textContent = 0;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const initialization = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0EL.classList.add('player--active');
  currentScore1EL.textContent = 0;
  currentScore2EL.textContent = 0;
  activePlayer = 0;
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

diceEL.classList.add('hidden');

// Roling Dice Functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true,
    if (dice != 1) {
      // add dice to current player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      //add current score to the selected player and make current Score = 0
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // Add curetn score to the score of active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--
        ');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  initialization();
});
