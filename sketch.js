
PLAY = 1;
END = 0;

var gameState = 1;
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart_3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets, bulletsImg, bulletGroup;

var life;

var restart;

var score = 0 

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/Soldier_Standing.png")

  shooter_shooting = loadImage("assets/Soldier_Shooting.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.png")

  bulletsImg = loadImage("assets/bullet_Img.png")

  reset_Img = loadImage("assets/Restart_Img.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  restart = createSprite(displayWidth/3 + 100, displayHeight/2)
  restart.addImage(reset_Img)
  restart.scale = 1.5
  restart.visible = false
  
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1100, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = false;
   player.setCollider("rectangle",0,0,200,300)


   //creating sprites to depict lives remaining

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 

  if(gameState === PLAY){

    life = 3;

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  createBullet();
  player.addImage(shooter_shooting)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(bulletGroup)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(bulletGroup)){
       zombieGroup[i].destroy()
       bulletGroup.destroyEach()
       score = score + 1;
       } 
 }
}

if(zombieGroup.isTouching(player) && life === 3){
  life = life-1;
}

if(zombieGroup.isTouching(player) && life === 2){
  life = life-1;
}

if(zombieGroup.isTouching(player) && life === 1){
  life = life-1
  gameState = END
}
//calling the function to spawn zombies
enemy();

drawSprites();


fill("white")
textSize(20)
text("Score : "+ score, displayWidth/9, displayHeight/6)

textSize(50)
fill("white")
text("life: " + life, displayWidth - 300,displayHeight/6)

  }


if(gameState === END && life === 0){

  restart.visible = true

  background(0)
  player.velocityY = 0;

  zombieGroup.setVelocityEach(0);
  zombieGroup.destroyEach();

   
  if(keyDown("R") ){
    reset();
  }


  textSize(20);
  text("Press R to restart ", displayWidth/3 + 100, displayHeight/2)

  textSize(50)
  text("Game Over", displayWidth/3 + 100, displayHeight/4);
}


//creating function to spawn zombies
}


function createBullet(){

  var bullets = createSprite(displayWidth-1000,displayHeight-290,50,50);
  bullets.y = player.y
  bullets.scale = 0.1
  bullets.addImage(bulletsImg)
  bullets.x = 360;
  bullets.velocityX = +10;
  bullets.lifetime = 200

  bulletGroup.add(bullets)
}

function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,200,800)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}

function reset(){

  gameState = 1 ;
  zombieGroup.destroyEach();
  score = 0;
}
