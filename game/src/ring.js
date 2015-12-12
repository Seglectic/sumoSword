/*
		Defines the combat 'ring' for players fight on
		This scene is the main component of the game.
*/

ring = function(){

	this.preload = function(){
		//game.load.image("gum","gfx/bubblegum.png");
		game.load.spritesheet('gum','gfx/gum.png',32,32)
		game.load.spritesheet("slash","gfx/slash.png",64,64);
		game.load.image("bg","gfx/sketch.png")

	};


	this.create = function(){
		//Define the 'gum' player character
		this.bg = game.add.sprite(0,0,'bg');
		this.player = createPlayer(game.width/2-(game.width/4),game.height/2,'gum',true);
		this.enemy = createPlayer(game.width/1.5,game.height/2,'gum',false);
	};


	this.update = function(){
		game.physics.arcade.collide(this.player,this.enemy)
		game.physics.arcade.collide(this.player.slashes,this.enemy)

	};


	this.render = function(){


	};
}


var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
game.state.add("ring",ring);
game.state.start("ring");