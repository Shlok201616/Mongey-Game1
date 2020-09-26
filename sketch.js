var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0
var gameover,jump,Gameover;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop= loadAnimation("sprite_0.png")
  jump=loadSound("jump.mp3")
 gameover=loadSound("die.mp3");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOver=loadImage("gameover.png");
 
}



function setup() {
   createCanvas(600,370);
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.addAnimation("collide",monkey_stop);
    monkey.scale=0.1;
  
  
  gameover=createSprite(300,185);
  gameover.addImage(gameOver);
  gameover.visible=false;
  
  
  obstacleGroup=createGroup();
   FoodGroup=createGroup();
  
    ground=createSprite(400,350,900,10);
  
    ground.x=ground.width/2;
    console.log(ground.x);
}


function draw() {
  background(180);
  
 
  console.log(PLAY);
  console.log(END);
  if(gameState===PLAY){
  
   
   Obstacles();
  Food();
  
    
    ground.velocityX=-4 
    
    console.log(frameCount);
    
    if(obstacleGroup.isTouching(monkey)){
    gameover.play();
     gameState=END;    
      
    }
      
    }
  
  
  if(gameState===END){
  
  ground.velocityX=0;
    obstacle.velocityX=0;
    banana.velocityX=0;
     monkey.changeAnimation("collide",monkey_stop);
    gameover.visible=true;
    
            
  if(mousePressedOver(monkey)) {
      reset();
    }
  }
    
  stroke("white");
  textSize(15);
  fill("white");
  text("Score:"+ score, 500, 50);
  
   monkey.collide(ground);
  
    if(ground.x<150){
    ground.x=400;
  }
  
  
  
   
     
  if(keyWentDown("space") && monkey.y >150){
     monkey.velocityY=-17;
    jump.play(); 
  
  }
  
 monkey.velocityY = monkey.velocityY +0.8
  
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    score=score+2;
    
  }
  
  
  

  
  drawSprites();
  
}
  
  
function reset(){
  gameState=PLAY;
 obstacleGroup.destroyEach();
 FoodGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);
  gameover.visible=false;
}



 function Obstacles(){
   if(World.frameCount%300===0){
   
   obstacle=createSprite(700,300,20,20)
   obstacle.addImage(obstaceImage)
   obstacle.velocityX=-4;
   obstacle.scale=1/4;
     
   obstacleGroup.add(obstacle);
     
  
     
     
   }
 }


  function Food(){
    if(World.frameCount%300===0){
    banana=createSprite(700,200,20,20)
      banana.scale=0.1
     banana.addImage(bananaImage)
      banana.velocityX=-4;
    
    FoodGroup.add(banana);
    
    
    }
  }
