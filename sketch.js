var trex,trex_ani,obstacle,clouds,ground,invi_ground,ground_ani,cloud_ani,rand,o1,o2,o3,o4,o5,o6,cloudsGroup,obstaclesGroup,count,gameState,PLAY,END,gameover,restart,gameove_ani,restart_ani,crash;
function preload(){
  trex_ani=loadAnimation("trex1.png","trex3.png","trex4.png")
  crash=loadAnimation("trex_collided.png")
  ground_ani=loadImage("ground2.png")
  restart_ani=loadImage("restart.png")
  gameover_ani=loadImage("gameOver.png")

   cloud_ani=loadImage("cloud.png")
 o1=loadImage("obstacle1.png")
   o2=loadImage("obstacle2.png")
   o3=loadImage("obstacle3.png")
   o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
}
function setup() {
  
  gameover=createSprite(250,100)
  restart=createSprite(250,150)
  restart.addImage("res",restart_ani)
  gameover.addImage("gam",gameover_ani)
  restart.scale=0.5
  gameover.scale=0.5
  restart.visible=false
  gameover.visible=false
  PLAY=1
  END=0
  gameState=PLAY
  count=0
  createCanvas(600,200);
  trex=createSprite(50,180)
  trex.addAnimation("label",trex_ani)
  trex.addAnimation("trex",crash)
  trex.scale=0.5
  ground=createSprite(390,180)
    ground.addImage("labe",ground_ani)
  invi_ground=createSprite(200,190,600,20)
   invi_ground.visible=false
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
}

function draw() {
  background(180);
  text("score"+count,10,10)
  if(gameState===PLAY){
    if(ground.x<0){
      ground.x=ground.width/2
    }
    ground.velocityX=-6
    count=Math.round(getFrameRate()/60)+count
    if(keyDown("space")&&trex.y>=156.5){
      trex.velocityY=-10 
    }
    trex.velocityY=trex.velocityY+1
    spawn_clouds();
    spawnobstacles()
    if(obstaclesGroup.isTouching(trex)){
      gameState=END
    }
      
  }
  else if(gameState===END){
    trex.changeAnimation("trex",crash)
    ground.velocityX=0
    trex.velocityY=0
    obstaclesGroup.setLifetimeEach(-5);
    cloudsGroup.setLifetimeEach(-5);
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    restart.visible=true
    gameover.visible=true
  }
 if(mousePressedOver(restart)) {
    reset();
  }
trex.collide(invi_ground)  
  drawSprites();
 
}
function  spawn_clouds(){
if(frameCount%60===0){
clouds=createSprite(200,100)
  clouds.addImage("lab",cloud_ani)
  clouds.y=Math.round(random(1,100))
  clouds.velocityX=-6
  clouds.lifetime=134
  clouds.depth=trex.depth
  trex.depth=trex.depth+1
 cloudsGroup.add(clouds);
  
}
  
}
function spawnobstacles() {
  if(World.frameCount % 60 === 0) {
     obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    rand = Math.round(random(1,6));
   
    switch(rand){
      case 1:
      obstacle.addImage("ob",o1)
        break;
         case 2:
      obstacle.addImage("ob",o2)
        break;
         case 3:
      obstacle.addImage("ob",o3)
        break;
         case 4:
      obstacle.addImage("ob",o4)
        break;
         case 5:
      obstacle.addImage("ob",o5)
        break;
         case 6:
      obstacle.addImage("ob",o6)
        break;
        default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  trex.changeAnimation("label",trex_ani)
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  count = 0;
  
}