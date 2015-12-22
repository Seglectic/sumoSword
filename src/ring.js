/*
		Defines the combat 'ring' for players fight on
		This scene is the main component of the game.
*/

ring = function(){

	this.players = {}

	this.preload = function(){
		playerPreload();
		game.load.image('bg','gfx/bigMap.png');
	};


	this.create = function(){
		this.bg = game.add.sprite(0,0,'bg');
		game.world.setBounds(0,0,this.bg.width,this.bg.height);
		game.physics.arcade.gravity.y = 400;


		//Player group is used to contain all player entities for collision detection, etc
		this.players = game.add.group()

		/* Defines static player characters: 
		this.player = createPlayer(this.bg.width/2-(this.bg.width/4),this.bg.height/2,'gum',true);
		this.enemy = createPlayer(this.bg.width/1.5,this.bg.height/2,'gum',false);
		this.players.add(this.player);
		this.players.add(this.enemy);
		*/

		//Fullscreen options
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		// game.input.onDown.add(()=>{game.scale.startFullScreen(false);});
	};


	this.update = function(){
		for(var pID in this.players){
			for(var eID in this.players){
				if(pID != eID){
					game.physics.arcade.collide(this.players[pID],this.players[eID]);
					//game.physics.arcade.collide(this.players[pID],this.players[eID].slashes,this.players[eID].hit);
				}
			}
		}

		// game.physics.arcade.collide(this.players); //Should work to collide all players together
	};


	this.render = function(){
		// game.debug.body(this.player);
		// game.debug.body(this.enemy);
		// game.debug.body(this.player.slashes)
	};
}

var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
// var game = new Phaser.Game(1000,562, Phaser.AUTO, 'game');
game.state.add("ring",ring);
game.state.start("ring");