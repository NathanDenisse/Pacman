//import { LEVEL } from "./setup";
//dimension zone de jeu
var LARGEUR = 430;
var HAUTEUR = 600;
var time = 0;
var score = 0;
const dot = [];
const SPEED = 2;
var pacman, ghost1;
var gameState = "play";
const wallGroup = [];

var r = 0;
var s = 0;
var t = Math.round(Math.random()) * 2 - 1;
var u = Math.round(Math.random()) * 2 - 1;

function setup() {
  createCanvas(LARGEUR, HAUTEUR);
  pacman = new Pacman(200, 300);
  ghost1 = new Ghost(230, 220, "pink");
  ghost2 = new Ghost(230, 250, "light blue");
  ghost3 = new Ghost(200, 250, "green");
  ghost4 = new Ghost(200, 220, "red");
  drawBoard();
}

function draw() {
  background("black");
  drawSprites();

  //MANGER LES PILLS
  eatPill();

  //Afficher les points blancs
  for (var i = 0; i < dot.length; i++) {
    dot[i].display();
  }
  for (var j = 0; j < wallGroup.length; j++) {
    wallGroup[j].display();
  }
  if (gameState === "play") {
    //PACMAN
    pacman.display();

    //GHOSTS
    ghost1.display();
    ghost2.display();
    ghost3.display();
    ghost4.display();

    // BOUGER PACMAN
    movePacman();
    moveGhost(ghost1);
    moveGhost(ghost2);
    moveGhost(ghost3);
    moveGhost(ghost4);

    if (
      isTouching(pacman, ghost1) ||
      isTouching(pacman, ghost2) ||
      isTouching(pacman, ghost3) ||
      isTouching(pacman, ghost4)
    ) {
      gameState = "gameOver";
    }
  }
  if (gameState === "gameOver") {
    stroke("red");
    strokeWeight(5);
    textSize(60);
    fill("red");
    text("GAME OVER", 30, 240);

    textSize(40);
    fill("white");
    text("Press Space", 100, 320);
    text("to play again", 100, 370);

    if (keyDown("space")) {
      gameState = "play";
      pacman.x = 200;
      pacman.y = 300;
      ghost1.x = 320;
      ghost1.y = 220;
      ghost2.x = 230;
      ghost2.y = 250;
      ghost3.x = 200;
      ghost3.y = 250;
      ghost4.x = 200;
      ghost4.y = 220;
      score = 0;
      dot.splice(0, dot.length);
      wallGroup.splice(0, wallGroup.length);

      drawBoard();
    }
  }
  stroke("red");
  strokeWeight(5);
  fill("White");
  textSize(40);
  text("Score: " + score, 130, 520);
}

const LEVEL = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
  2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2,
  1, 1, 1, 2, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1,
  7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1,
  2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1,
  1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2,
  1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0,
  0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1,
  9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2,
  2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1,
  2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2,
  2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1,
  1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2,
  1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function drawBoard() {
  var posX = 20;
  var posY = 20;

  for (var i = 0; i < LEVEL.length; i++) {
    switch (LEVEL[i]) {
      case 0:
        console.log("hello");
        break;
      case 1:
        var wall = new Wall(posX, posY, 19, 19);
        wallGroup.push(wall);
        break;
      case 2:
        var new_dot = new Dot(posX, posY, 5);
        dot.push(new_dot);
        break;
      case 7:
        dot.push(new Dot(posX, posY, 13));
        break;
    }

    posX += 20;
    if (posX > 400) {
      posX = 20;
      posY += 20;
    }
  }
}

function movePacman() {
  for (var k = 0; k < wallGroup.length; k++) {
    if (isTouching(pacman, wallGroup[k]) && pacman.speed.x < 0) {
      pacman.x += 5;
      pacman.speed.x = 0;
      pacman.speed.y = SPEED * s;
    }
    if (isTouching(pacman, wallGroup[k]) && pacman.speed.x > 0) {
      pacman.x -= 5;
      pacman.speed.x = 0;
      pacman.speed.y = SPEED * s;
    }
    if (isTouching(pacman, wallGroup[k]) && pacman.speed.y < 0) {
      pacman.y += 5;
      pacman.speed.y = 0;
      pacman.speed.x = SPEED * r;
    }
    if (isTouching(pacman, wallGroup[k]) && pacman.speed.y > 0) {
      pacman.y -= 5;
      pacman.speed.y = 0;
      pacman.speed.x = SPEED * r;
    }
    if (keyDown("LEFT")) {
      pacman.speed.x = -SPEED;
      pacman.speed.y = 0;
      r = -1;
    }
    if (keyDown("RIGHT")) {
      pacman.speed.x = SPEED;
      pacman.speed.y = 0;
      r = 1;
    }
    if (keyDown("UP")) {
      pacman.speed.x = 0;
      pacman.speed.y = -SPEED;
      s = -1;
    }

    if (keyDown("DOWN")) {
      pacman.speed.x = 0;
      pacman.speed.y = SPEED;
      s = 1;
    }
  }
  if (pacman.x < 0) {
    pacman.x = 400;
  }
  pacman.x % 400;
}

function eatPill() {
  for (var i = 0; i < dot.length; i++) {
    if (isTouching(pacman, dot[i])) {
      dot.splice(i, 1);
      i++;
      score += 50;
    }
  }
}

function isTouching(object1, object2) {
  if (
    object1.x - object2.x < object2.width / 2 + object1.width / 2 &&
    object2.x - object1.x < object2.width / 2 + object1.width / 2 &&
    object1.y - object2.y < object2.height / 2 + object1.height / 2 &&
    object2.y - object1.y < object2.height / 2 + object1.height / 2
  ) {
    return true;
  } else {
    return false;
  }
}

function moveGhost(ghost) {
  time++;
  if (time % Math.floor(Math.random() * 100) === 0) {
    if (ghost.speed.x != 0) {
      ghost.speed.y = (Math.round(Math.random()) * 2 - 1) * SPEED;
      ghost.speed.x = 0;
    }
    if (ghost.speed.y != 0) {
      ghost.speed.x = (Math.round(Math.random()) * 2 - 1) * SPEED;
      ghost.speed.y = 0;
    }
  }

  for (var k = 0; k < wallGroup.length; k++) {
    if (isTouching(ghost, wallGroup[k]) && ghost.speed.x < 0) {
      ghost.x += 5;
      ghost.speed.x = 0;
      ghost.speed.y = SPEED * -u;
    }
    if (isTouching(ghost, wallGroup[k]) && ghost.speed.x > 0) {
      ghost.x -= 5;
      ghost.speed.x = 0;
      ghost.speed.y = SPEED * u;
    }
    if (isTouching(ghost, wallGroup[k]) && ghost.speed.y < 0) {
      ghost.y += 5;
      ghost.speed.y = 0;
      ghost.speed.x = SPEED * -t;
    }
    if (isTouching(ghost, wallGroup[k]) && ghost.speed.y > 0) {
      ghost.y -= 5;
      ghost.speed.y = 0;
      ghost.speed.x = SPEED * t;
    }
  }
  ghost.x %= 400;
  ghost.y %= 400;
  if (ghost.x < 0) {
    ghost.x = 400;
  }
  if (ghost.y < 20) {
    ghost.y = 230;
  }
}
