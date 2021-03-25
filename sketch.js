var backgroundImg, marioImg, ObstacleImg;
var back,ground;
var mario, mariodie;
var obstacle, obstacleGroup;
var brick, brickImg, brickGroup;
var gameState = "PLAY"
var score = 0;
var restart, gameoverImg, gameover, restartImg;

function preload(){
backgroundImg = loadImage("bg.png");
marioImg = loadAnimation("mario00.png","mario02.png", "mario03.png");
ObstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
brickImg = loadImage("brick.png");
mariodie = loadAnimation("collided.png");
restartImg = loadImage("restart.png");
gameoverImg = loadImage("gameOver.png");
}

function setup(){
createCanvas(800,400);
imageMode(CENTER);

back = createSprite(600,200);
backgroundImg.resize(1600,400);
back.addImage(backgroundImg);
back.velocityX = -4;

ground = createSprite(100,350,100,10);
ground.visible = false;

mario = createSprite(100,305);
mario.addAnimation("running",marioImg);
mario.addAnimation("die",mariodie);
mario.setCollider("rectangle",0,0,20,mario.height);
mario.scale = 2;

restart = createSprite(400,150);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

gameover = createSprite(400,100);
gameover.addImage(gameoverImg);
gameover.visible = false;

obstacleGroup = new Group();
brickGroup = new Group();

}

function draw(){
    background("white");

  if(gameState === "PLAY"){
      score = score+Math.round(getFrameRate()/60);
    if(back.x < 0){
        back.x = back.width/2
    }
    mario.changeAnimation("running",marioImg);
   if(keyDown("space")&& mario.y > 300){
       mario.velocityY = -13;
   }
   mario.velocityY = mario.velocityY + 0.5;
  
   if(mario.isTouching(brickGroup)){
       brickGroup.destroyEach();
   }
   if(mario.isTouching(obstacleGroup) ){
       gameState = "END";
   }
    Obstacles();
    Bricks();
    
  }

if(gameState === "END"){
 back.velocityX = 0;
 brickGroup.setVelocityXEach(0);
 obstacleGroup.setVelocityXEach(0);
 brickGroup.setLifetimeEach(-1);
 obstacleGroup.setLifetimeEach(-1);
 mario.changeAnimation("die",mariodie);
 restart.visible = true;
 gameover.visible = true;
if(mousePressedOver(restart)){
    restartgame();
}

 }
 mario.collide(ground);
drawSprites();
textSize(20);
fill("red");
text("score : "+score,600,50);
}


function Obstacles(){
    if(frameCount % 200 === 0 ){
        obstacle = createSprite(800,320);
        obstacle.addAnimation("obstacles",ObstacleImg);
        obstacle.velocityX = -4;
        obstacle.lifetime = 400;
        obstacleGroup.add(obstacle);
    }
}

function Bricks(){
    if(frameCount % 250 === 0 ){
        var randY = Math.round(random(150,250));
        brick = createSprite(800,randY);
        brick.addImage(brickImg);
        brick.velocityX = -4;
        brick.lifetime = 400;
        brickGroup.add(brick);
    }

}

function restartgame(){
    gameState = "PLAY"
    restart.visible = false;
    gameover.visible = false;
    brickGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0; 
    back.velocityX = -4;
}