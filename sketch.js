
  var bird,birdImg, ground;
  var food,foodImg, obstacle, ObstacleImage;
  var FoodGroup, obstaclesGroup, skyImg;
  var survivalTime=0;
  var score=0;
  var PLAY=1;
  var END=0;
var gameState=PLAY;

  function preload(){
birdImg=loadImage("bird.png")
    foodImg=loadImage("food.png")
    ObstacleImage = loadImage("helicopter.png");
    skyImage=loadImage("sky.jpg");
  }

  function setup(){
    createCanvas(1000,300);
 
    //create groups
    foodGroup= new Group();
    obstaclesGroup= new Group();
    
    //create monkey sprite
    bird=createSprite(80,215,20,20);
    bird.addImage(birdImg);
    bird.scale=0.1;
    //monkey.debug=true;
    //create ground sprite
    
   ground=createSprite(400,290,3000,30);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    ground.visible=false;

    //create an invisible ground
    invisibleGround = createSprite(400,290,3000,120);
    invisibleGround.visible = false;
    }
  function draw(){
    background(skyImage);
   
    if(gameState===PLAY){
    if(keyDown("space") && bird.y >= 100) {
      bird.velocityY = -10;
    }        
bird.velocityY = bird.velocityY + 0.8  

  if(ground.x<0){
      ground.x=30;
    }
    bird.collide(invisibleGround); 

    //add survival time
    stroke("black");
    textSize(20);
    fill("black");
    
    stroke("white");
    textSize(20);
    fill("white");
    text("score="+ score, 270,30);
    
    if(bird.isTouching(foodGroup)){
      score=score+1;
      foodGroup.destroyEach();
 } 
 survivalTime=Math.ceil(score/4);
    text("survivalTime:"+survivalTime, 30,30);   
    
    if(obstaclesGroup.isTouching(bird)){
  gameState=END;

    }
    spawnfood();
    spawnObstacles();
  } 
  else if(gameState===END) {
    ground.velocityX = 0;
    bird.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    textSize(70);
    fill("red");
    text("GAMEOVER",300,150);

  if(keyCode===ENTER){
    reset();
  }
  }
drawSprites();
  console.log(gameState);
}
  //create function for spawning obstacles
  function spawnObstacles(){
    if (frameCount % 150 === 0) {
      var obstacle = createSprite(700,50,40,10);
      obstacle.y = Math.round(random(250,100));
      obstacle.addImage(ObstacleImage);
     obstacle.scale = 0.25;
      obstacle.velocityX = -6;
      obstacle.lifetime=400;  
      obstaclesGroup.add(obstacle);  
  }
  }
  //create function fpr spawning bananas
  function spawnfood() {
    if (frameCount % 80 === 0) {
      var food = createSprite(400,50,40,10);
      food.y = Math.round(random(100,120));
      food.addImage(foodImg);
     food.scale = 0.1;
      food.velocityX = -6;
      food.lifetime=200;  
      foodGroup.add(food);
    }
  }
  function reset(){
    survivalTime=0;
    gameState = PLAY;
   
   obstaclesGroup.destroyEach();
    foodGroup.destroyEach();

     score=0;
    
  }  