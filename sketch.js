var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ob1, ob2, ob3 ,ob4, ob5, ob6;
var PLAY=1;
var END=0
var gameState=PLAY
var score=0
var gameOver, gameOverImg
var jumpSound, dieSound, checkPointSound

function preload() {    
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png")
    cloudimage = loadImage ("cloud.png")
    ob1 = loadImage ("obstacle1.png")
    ob2 = loadImage ("obstacle2.png")
    ob3 = loadImage ("obstacle4.png")
    ob4 = loadImage ("obstacle4.png")
    ob5 = loadImage ("obstacle5.png")
    ob6 = loadImage ("obstacle6.png")
    gameOverImg=loadImage("gameOver.png")
    restartImg=loadImage("restart.png")
    jumpSound=loadSound("jump.mp3")
    dieSound=loadSound("die.mp3")
    checkPointSound=loadSound("checkpoint.mp3")
}

function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    invisibleGround=createSprite (200,190,400,10)
    invisibleGround.visible=false
    obstacleGroup=new Group();
    cloudsGroup=new Group();
    gameOver=createSprite(300, 100)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5
    restart=createSprite(300, 70)
    restart.addImage(restartImg)
    restart.scale=0.5
}

function draw() {
    background("yellow");
    //jump when the space button is pressed
    text("puntuacion: "+score, 500, 50)
    if(gameState===PLAY)
    {
        gameOver.visible=false
        restart.visible=false
        ground.velocityX = -4;
        score=score+Math.round(frameCount/60)
        if (score > 0 && score%300===0)
        {
            checkPointSound.play();
        }
        if (ground.x < 0) {
            ground.x = ground.width / 2;
            }
            if (keyDown("space") && trex.y>=100) {
                trex.velocityY = -10;
                jumpSound.play();
                }
                trex.velocityY = trex.velocityY + 0.8
                spawnClouds()
                spawnObstacles()
                if (obstacleGroup.isTouching(trex))
                {
                    gameState=END
                    dieSound.play();
                }

    }
    else if (gameState===END)
    {
        gameOver.visible=true;
        restart.visible=true;
        trex.changeAnimation("collider", trex_collided)
        trex.velocityY=0;
        ground.velocityX=0
        obstacleGroup.setLifetimeEach(-1)
        cloudsGroup.setLifetimeEach(-1)
        obstacleGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)
        if (mousePressedOver(restart))
        {
            reset();
        }
    }


    trex.collide(invisibleGround);
    trex.debug=true
    trex.setCollider("circle", 0, 0, 40)


    drawSprites();
}
function spawnClouds()
{
    if(frameCount % 60===0){
    clouds=createSprite(600,100,40,10);
    clouds.velocityX=-3
    clouds.addImage(cloudimage)
    clouds.scale=0.2
    clouds.y=Math.round(random(10,60))
    clouds.depth=trex.depth
    trex.depth=trex.depth+1
    clouds.lifetime=200
    cloudsGroup.add(clouds)
}
}
function spawnObstacles()
{
    if(frameCount % 60===0){
        var obstacle=createSprite(600,165,10,40);
        obstacle.velocityX=-6
var rand=Math.round(random(1, 6))
switch(rand){
           case 1: obstacle.addImage(ob1);
           break;
           case 2: obstacle.addImage(ob2);
           break;
           case 3: obstacle.addImage(ob3);
           break;
           case 4: obstacle.addImage(ob4);
           break;
           case 5: obstacle.addImage(ob5);
           break;
           case 6: obstacle.addImage(ob6);
           break
default: break;
}
obstacle.scale=0.5
obstacle.lifetime=100
obstacleGroup.add(obstacle)
  }
}
function reset()
{
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    obstacleGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running", trex_running)
    score=0
}