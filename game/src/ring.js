/*
		Defines the combat 'ring' for players fight on
		This scene is the main component of the game.
*/

ring = function(){

	this.preload = function(){
		playerPreload();
	};


	this.create = function(){
		//Define the 'gum' player character
		this.bg = game.add.sprite(0,0,'bg');
		
		this.players = []
		
		//this.player = createPlayer(game.width/2-(game.width/4),game.height/2,'gum',true);
		//this.enemy = createPlayer(game.width/1.5,game.height/2,'gum',false);
	};


	this.update = function(){
		
		for(var player of this.players){
			for(var enemy of this.players){
				if(player != enemy){
					game.physics.arcade.collide(player,enemy);
					game.physics.arcade.collide(player,enemy.slashes,enemy.hit);
				}
			}
		}
		//game.physics.arcade.collide(this.player,this.enemy);
		//game.physics.arcade.collide(this.enemy,this.player.slashes,this.player.hit);
	};


	this.render = function(){
		// game.debug.body(this.player);
		// game.debug.body(this.enemy)	
	};
}

var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
game.state.add("ring",ring);
game.state.start("ring");