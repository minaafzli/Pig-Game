'use strict';

const playerE0 = document.querySelector(`.player--0`);
const playerE1 = document.querySelector(`.player--1`);
let scor_Element0 = document.getElementById(`score--0`);
let scor_Element1 = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
let currentEl0 = document.getElementById(`current--0`);
let currentEl1 = document.getElementById(`current--1`);

let CurrentScore, activePlayer, playing, scores;

const init = function () {
  CurrentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  scor_Element0.textContent = CurrentScore; //first score is 0
  scor_Element1.textContent = CurrentScore;

  diceEl.classList.add('hidden');
  playerE0.classList.remove('player--winner');
  playerE1.classList.remove('player--winner');
  playerE0.classList.add('player--active');
  playerE1.classList.remove('player--active');
};

init();

const changeTurn = function () {
  CurrentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    CurrentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerE0.classList.toggle('player--active');
  playerE1.classList.toggle('player--active');
};

btn_roll.addEventListener('click', function () {
  if (playing) {
    //make random dice
    const dice = Number(Math.floor(Math.random() * 6 + 1));
    //display dice
    diceEl.classList.remove('hidden'); //to show the dice
    diceEl.src = `dice-${dice}.png`;
    CurrentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      CurrentScore;
    //check 1
    if (dice === 1) {
      changeTurn();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += CurrentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      CurrentScore = 0;
      scores.textContent = CurrentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        CurrentScore;
      scores = 0;
      diceEl.classList.add('hidden');
    } else {
      changeTurn();
    }
  }
});

btn_new.addEventListener('click', function () {
  init();

  activePlayer = activePlayer === 1 ? 0 : 0; //change turn to player1
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  playing = true;
});
