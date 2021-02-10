class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    apple1 = createSprite(400,-displayHeight*3.52);
    apple1.addImage("apple1",apple_img);
    apple1.scale = 0.4;
    apple2 = createSprite(600,-displayHeight*3.52);
    apple2.addImage("apple2",apple_img);
    apple2.scale = 0.4;
    apple3 = createSprite(800,-displayHeight*3.52);
    apple3.addImage("apple3",apple_img);
    apple3.scale = 0.4;
    apple4 = createSprite(1000,-displayHeight*3.52);
    apple4.addImage("apple4",apple_img);
    apple4.scale = 0.4;
    snake1 = createSprite(100,200);
    snake1.addImage("snake1",snake1_img);
    snake1.scale = 0.3;
    snake2 = createSprite(300,200);
    snake2.addImage("snake2",snake2_img);
    snake2.scale = 0.2;
    snake3 = createSprite(500,200);
    snake3.addImage("snake3",snake3_img);
    snake3.scale = 0.2;
    snake4 = createSprite(700,200);
    snake4.addImage("snake4",snake4_img);
    snake4.scale = 0.5;
    snakes = [snake1, snake2, snake3,snake4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getSnakesAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the snakes
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the snakes a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the snakes in y direction
        y = displayHeight - allPlayers[plr].distance;
        snakes[index-1].x = x;
        snakes[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,40,40);
          snakes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = snakes[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateSnakesAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
