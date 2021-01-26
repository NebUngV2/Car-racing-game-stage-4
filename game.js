class Game {
constructor() {

}
   getState() {
       var gameStateRef=database.ref('gameState');
       gameStateRef.on("value", function(data){
           gameState=data.val();
       })
   }
   update(state) {
       database.ref('/').update({
           gameState:state
       })
   }
   async start() {
       if(gameState===0) {
           player = new Player()
           var playerCountRef = await database.ref('playerCount').once("value");
           if(playerCountRef.exists()) {
                playerCount=playerCountRef.val()
                player.getCount()
           }
           form=new Form()
           form.display();
       }
       car1 = createSprite(200, 400);
       car2 = createSprite(400, 400);
       car3 = createSprite(600, 400);
       car4 = createSprite(800, 400);
       cars = [car1, car2, car3, car4];
       car1.visible=false
       car2.visible=false
       car3.visible=false
       car4.visible=false
   }
   play() {
       form.hide();
       //textSize(30);
       //text("Game Started", 120, 100);
       Player.getPlayerInfo()
       car1.visible=true
       car2.visible=true
       car3.visible=true
       car4.visible=true
       if(allPlayers!==undefined) {
           var index = 0
           var x = 0
           var y = 200
           for(var plr in allPlayers) {
               index=index+1
               x = x+270
               y = displayHeight-allPlayers[plr].distance
               cars[index-1].x = x
               cars[index-1].y = y
               if(index===player.index) {
                   cars[index-1].shapeColor = "red";
                   camera.position.x=displayWidth/2
                   camera.position.y=cars[index-1].y
               }
           }
           var a = 120
           a+=20
           //textSize(15)
           //text(allPlayers[plr].name+":"+allPlayers[plr].distance, 120, a)
       }
       if(keyDown(UP_ARROW)&&player.index!==null) {
        player.index+=50
        player.update();
    }
   }
}