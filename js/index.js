"use strict";

var rock = 0;
var paper = 1;
var scissors = 2; //move type enum

var playerScore = 0;
var aiScore = 0;
var aiMove;
var move;
var gameState = false; //global scope variables

var winsLeft = 0;

var output = document.getElementById("result");

function pickRandom() {
  //game run
  return Math.floor(Math.random() * 3);
}

function resultWrite(state, plSign, aiSign) {
  output.innerHTML = ""; //clear result
  output.insertAdjacentHTML(
    "beforeEnd",
    "YOU " +
      state +
      ": you played " +
      plSign +
      " and computer played " +
      aiSign +
      "<br><br>"
  );
  counter();
}

function scoreWrite() {
  var score = document.getElementById("score");
  score.innerHTML = "";
  score.innerHTML = "Player: " + playerScore + "<br>Computer: " + aiScore;
}

function draw() {
  output.innerHTML = "";
  output.insertAdjacentHTML("beforeEnd", "ROUND DRAW nobody wins<br><br>");
}

var playerMove = function(move) {
  //computer moves
  var aiMove = pickRandom();

  if (move == aiMove) {
    //draw condition
    return draw();
  }
  if (move === 0 && aiMove === 1) {
    //lose conditions
    aiScore++;
    return resultWrite("LOST", "ROCK", "PAPER");
  }
  if (move === 1 && aiMove === 2) {
    aiScore++;
    return resultWrite("LOST", "PAPER", "SCISSORS");
  }
  if (move === 2 && aiMove === 0) {
    aiScore++;
    return resultWrite("LOST", "SCISSORS", "ROCK");
  }

  if (move === 1 && aiMove === 0) {
    //win conditions
    playerScore++;
    winsLeft--;
    return resultWrite("WON", "PAPER", "ROCK");
  }
  if (move === 2 && aiMove === 1) {
    playerScore++;
    winsLeft--;
    return resultWrite("WON", "SCISSORS", "PAPER");
  }
  if (move === 0 && aiMove === 2) {
    playerScore++;
    winsLeft--;
    return resultWrite("WON", "ROCK", "SCISSORS");
  }
};
scoreWrite();

var buttons = document.querySelectorAll(".play");

function clickButton(click) {
  playerMove(click);
  scoreWrite();
}

buttons.forEach(function(element, index) {
  element.addEventListener("click", function() {
    clickButton(parseInt(element.dataset.type));
  });
});
  
//new game

var newGame = document.getElementById("newgame");
var roundsLeft = document.getElementById("rounds");
var container = document.querySelector(".container");

function roundNumber() {
  //get round number via prompt

  var numberOfRounds = parseInt(window.prompt("Type in won rounds until won:"));

  if (
    isNaN(numberOfRounds) ||
    numberOfRounds === " " ||
    numberOfRounds === null
  ) {
    alert("It's not a proper number!");
    return "Try again";
  }
  buttons.forEach(function(element, index) {
    element.classList.remove("hide");
  });
  newGame.classList.add("hide");
  container.classList.remove("hide");
  return numberOfRounds;
}

function counter() {
  if (!gameState) {
    winsLeft = parseInt(roundNumber());
  }
  roundsLeft.innerHTML = "Wins left: " + winsLeft;
  if (winsLeft === 0) {
    alert("You won entire game!");
    // removeListener();
    buttons.forEach(function(element, index) {
      element.classList.add("hide");
    });
    newGame.classList.remove("hide");
    container.classList.add("hide");
  }
}

newGame.addEventListener("click", function() {
  playerScore = 0;
  aiScore = 0;
  gameState = false;
  counter();
  output.innerHTML = "";
  gameState = true;
  hasStarted();
});

function hasStarted() {
  if (gameState === false) {
    output.innerHTML = "Start game";
    return false;
  }
  return true;
}

hasStarted();