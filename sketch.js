var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var gameState = "play"
var obgroup
var points = 0

function preload() {
  bgImg = loadImage("assets/bg.png")

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")

  obstacleTop1 = loadImage("assets/obsTop1.png")
  obstacleTop2 = loadImage("assets/obsTop2.png")

  obstacleBottom1 = loadImage("assets/obsBottom1.png")
  obstacleBottom2 = loadImage("assets/obsBottom2.png")
  obstacleBottom3 = loadImage("assets/obsBottom2.png")

  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
}

function setup() {

  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.2;

  gameOver = createSprite(200, 200, 20, 50)
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.7
  gameOver.visible = false
  restart = createSprite(200, 240, 20, 50)
  restart.addImage("restart", restartImg)
  restart.scale = 0.7
  restart.visible = false
  obgroup = new Group ()
}

function draw() {

  background("black");
  if (gameState == "play") {

    //making the hot air balloon jump
    if (keyDown("space")) {
      balloon.velocityY = -6;

    }
    if (frameCount % 100 === 0)
    {
    
    points = points+1}
    //adding gravity
    balloon.velocityY = balloon.velocityY + 2;
    spawnObsticals()
    spawnBuildings()
if (balloon.isTouching(obgroup)){
  gameState = "end"
  console.log("gameOver")
}
  }

if (gameState == "end") {
  gameOver.visible = true
  restart.visible = true
  balloon.velocityX = 0
  balloon.velocityY = 0
  obgroup.setVelocityXEach(0)
  if (mousePressedOver(restart)) {
    
    reset()
  }
}
  drawSprites();
 
textSize(20)
fill("red")
  text("Score: "+points, 300,50)
}

function reset() {
  points = 0
  gameState = "play"
obgroup.destroyEach()
restart.visible = false
gameOver.visible = false
}


function spawnObsticals() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(360, 265, 10, 40)
    obstacle.velocityX = (-6)
    obstacle.y = Math.round(random(60, 180))
    var rand = Math.round(random(1, 2));

    switch (rand) {
      case 1: obstacle.addImage(obstacleTop1);
        break;
      case 2: obstacle.addImage(obstacleTop2);
        break;
      default: break
    }
    obstacle.scale = 0.1
    obgroup.add(obstacle)
  }

}

function spawnBuildings() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(100, 265, 10, 40)
    obstacle.velocityX = (-6)
    var rand = Math.round(random(1, 3));

    switch (rand) {
      case 1: obstacle.addImage(obstacleBottom1);
        break;
      case 2: obstacle.addImage(obstacleBottom2);
        break;
      case 3: obstacle.addImage(obstacleBottom3);
        break;
      default: break
    }
    obstacle.scale = 0.1
    obgroup.add(obstacle)
  }

}