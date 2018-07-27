"use strict";

const rock = 0;
const paper = 1;
const scissors = 2; //move type enum

var params = {
  playerScore: 0,
  aiScore: 0,
  aiMove: undefined,
  move: undefined,
  gameState: false
}

var progress = {
  tbRound: 0,
  tbPlayerMove: null,
  tbAiMove: null,
  tbResult: null,
  tbScore: null
}


function writeTable() {
  var tbData = document.getElementById('tbData');
  var row = document.createElement('tr');
 
  for (var element in progress) {
    var data = document.createElement('td');
    var dataNode = document.createTextNode(progress[element]);
    data.appendChild(dataNode);
    row.appendChild(data);
    tbData.appendChild(row);
  };
}

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
  progress.tbResult = state;
  progress.tbPlayerMove = plSign;
  progress.tbAiMove = aiSign;
  progress.tbRound++;
  progress.tbScore = params.playerScore + '-' + params.aiScore;
  writeTable();
  counter();
}

function scoreWrite() {
  var score = document.getElementById("score");
  score.innerHTML = "";
  score.innerHTML = "Player: " + params.playerScore + "<br>Computer: " + params.aiScore;
}

function draw() {
  output.innerHTML = "";
  output.insertAdjacentHTML("beforeEnd", "ROUND DRAW nobody wins<br><br>");
}

var playerMove = function(move) {
  //computer moves
  params.aiMove = pickRandom();

  if (move == params.aiMove) {
    //draw condition
    progress.tbResult = 'DRAW';
    progress.tbPlayerMove = (move === 0 ? 'ROCK' : (move === 1 ? 'PAPER' : 'SCISSORS'));
    progress.tbAiMove = (move === 0 ? 'ROCK' : (move === 1 ? 'PAPER' : 'SCISSORS'));
    progress.tbRound++;
    progress.tbScore = params.playerScore + '-' + params.aiScore;
    writeTable();
    return draw();
  }
  if (move === 0 && params.aiMove === 1) {
    //lose conditions
    params.aiScore++;
    return resultWrite("LOST", "ROCK", "PAPER");
  }
  if (move === 1 && params.aiMove === 2) {
    params.aiScore++;
    return resultWrite("LOST", "PAPER", "SCISSORS");
  }
  if (move === 2 && params.aiMove === 0) {
    params.aiScore++;
    return resultWrite("LOST", "SCISSORS", "ROCK");
  }

  if (move === 1 && params.aiMove === 0) {
    //win conditions
    params.playerScore++;
    winsLeft--;
    return resultWrite("WON", "PAPER", "ROCK");
  }
  if (move === 2 && params.aiMove === 1) {
    params.playerScore++;
    winsLeft--;
    return resultWrite("WON", "SCISSORS", "PAPER");
  }
  if (move === 0 && params.aiMove === 2) {
    params.playerScore++;
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
  if (!params.gameState) {
    winsLeft = parseInt(roundNumber());
  }
  roundsLeft.innerHTML = "Wins left: " + winsLeft;
  if (winsLeft === 0) {
    buttons.forEach(function(element, index) {
      element.classList.add("hide");
    });
    newGame.classList.remove("hide");
    container.classList.add("hide");
    showModal('modal-won');
  }
}

newGame.addEventListener("click", function() {
  params.playerScore = 0;
  params.aiScore = 0;
  params.gameState = false;
  var clearTable = document.getElementById('tbData');
  progress.tbRound = 0;
  clearTable.innerHTML = '';
  counter();
  output.innerHTML = "";
  params.gameState = true;
  hasStarted();
});

function hasStarted() {
  if (params.gameState === false) {
    output.innerHTML = "Start game";
    return false;
  }
  return true;
}

hasStarted();

var showModal = function(event){
  // event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function(element, index) {
    element.classList.remove('show');
  });
  document.getElementById(event).classList.add('show');
};

var hideModal = function(event){
  // event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}