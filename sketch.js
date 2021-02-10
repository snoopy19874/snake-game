var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;


var form, player, game;

var snakes, snake1, snake2, snake3, snake4;

var track, snake1_img, snake2_img, snake3_img, snake4_img, apple_img;

var apple1,apple2,apple3,apple4;

var gold,silver,bronze;

var gold_img,silver_img,bronze_img;

function preload(){
  track = loadImage("images/SAND.jpg");
  snake1_img = loadImage("images/snake.png");
  snake2_img = loadImage("images/snake2__.png");
  snake3_img = loadImage("images/snake3__.png");
  snake4_img = loadImage("images/snake4__.png");
  ground = loadImage("images/ground.png");
  apple_img = loadImage("images/apple.png");
  gold_img = loadImage("images/gold.png");
  silver_img = loadImage("images/silver.png");
  bronze_img = loadImage("images/bronze.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
