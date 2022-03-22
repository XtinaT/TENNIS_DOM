"use strict";
var RAF=
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback)
    { window.setTimeout(callback, 1000 / 60); }
      ;

const courtWidth = 400;
const courtHeight = 250;
const ballSize = 20;
const playerWidth = 5;
const playerHeight = 50;

var court = document.getElementById("court");
court.style.left = 0 + "px";
court.style.top = 0 + "px";
court.style.width = courtWidth + "px";
court.style.height = courtHeight + "px";
var courtPosX = court.offsetLeft;
var courtPosY = court.offsetTop;

var ball = document.createElement("div");
ball.id = "ball";
court.appendChild(ball);
ball = {
  posX: courtWidth / 2 - ballSize / 2,
  posY: courtHeight / 2 - ballSize / 2,
  speedX: 0,
  speedY: 0,
  update: function () {
    var ballElem = document.getElementById("ball");
    ballElem.style.left = this.posX + "px";
    ballElem.style.top = this.posY + "px";
  },
};
ball.update();

var player1 = document.createElement("div");
player1.id = "player1";
court.appendChild(player1);
var player1 = {
  posX: 0,
  posY: (courtHeight - playerHeight) / 2,
  speed: 0,
  score: 0,
  set: function () {
    var player = document.getElementById("player1");
    player.style.top = this.posY + "px";
    player.style.left = this.posX + "px";
  },
  updateScore: function () {
    var score1Span = document.getElementById("score1");
    score1Span.innerHTML = this.score;
  },
};
player1.set();

var player2 = document.createElement("div");
player2.id = "player2";
court.appendChild(player2);
var player2 = {
  posX: courtWidth - playerWidth,
  posY: (courtHeight - playerHeight) / 2,
  speed: 0,
  score: 0,
  set: function () {
    var player = document.getElementById("player2");
    player.style.left = this.posX + "px";
    player.style.top = this.posY + "px";
  },
  updateScore: function () {
    var score2Span = document.getElementById("score2");
    score2Span.innerHTML = this.score;
  },
};
player2.set();

addEventListener("keydown", movePlayer, false);
addEventListener("keyup", stopPlayer, false);

  function movePlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16) player1.speed = -10;
    if (e.keyCode == 17) player1.speed = 10;
    if (e.keyCode == 38) player2.speed = -10;
    if (e.keyCode == 40) player2.speed = 10;
  }

  function stopPlayer(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.keyCode == 16 || e.keyCode == 17) player1.speed = 0;
    if (e.keyCode == 38 || e.keyCode == 40) player2.speed = 0;
  }

function tick() {
  console.log(player1.posY);
  player1.posY += player1.speed;
  player2.posY += player2.speed;
  if (player1.posY <= 0) player1.posY = 0;
  if (player2.posY <= 0) player2.posY = 0;
  if (player1.posY + playerHeight >= courtHeight)
    player1.posY = courtHeight - playerHeight;
  if (player2.posY + playerHeight >= courtHeight)
    player2.posY = courtHeight - playerHeight;

  player1.set();
  player2.set();

  ball.posX += ball.speedX;
  if (
    ball.posX + ballSize >= player2.posX &&
    ball.posY + ballSize >= player2.posY &&
    ball.posY <= player2.posY + playerHeight
  ) {
    ball.speedX = -ball.speedX;
  }
  if (ball.posX + ballSize > courtWidth) {
    ball.speedX = 0;
    ball.speedY = 0;
    ball.posX = courtWidth - ballSize;
    player2.score++;
    player2.updateScore();
  }

  if (
    ball.posX <= player1.posX + playerWidth &&
    ball.posY + ballSize >= player1.posY &&
    ball.posY <= player1.posY + playerHeight
  ) {
    ball.speedX = -ball.speedX;
  }
  if (ball.posX < 0) {
    ball.speedX = 0;
    ball.speedY = 0;
    ball.posX = 0;
    player1.score++;
    player1.updateScore();
  }

  ball.posY += ball.speedY;
  if (ball.posY + ballSize > courtHeight) {
    ball.speedY = -ball.speedY;
    ball.posY = courtHeight - ballSize;
  }
  if (ball.posY < 0) {
    ball.speedY = -ball.speedY;
    ball.posY = 0;
  }
  ball.update();
  RAF(tick);
}

function start(e) {
  e = e||window.event;
  e.preventDefault();
  ball.posX = courtWidth / 2 - ballSize / 2;
  ball.posY = courtHeight / 2 - ballSize / 2;
  ball.speedX = 3;
  ball.speedY = 2;
}
tick();

