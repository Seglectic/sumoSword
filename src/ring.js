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
		//Define the 'gum' player character
		this.bg = game.add.sprite(0,0,'bg');
		// this.player = createPlayer(game.width/2-(game.width/4),game.height/2,'gum',true);
		//this.player = createPlayer(this.bg.width/2-(this.bg.width/4),this.bg.height/2,'gum',true);
		//this.enemy = createPlayer(this.bg.width/1.5,this.bg.height/2,'gum',false);
		game.world.setBounds(0,0,this.bg.width,this.bg.height);

		game.physics.arcade.gravity.y = 400;

		game.camera.follow(this.player)

		//Fullscreen options
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		// game.input.onDown.add(()=>{game.scale.startFullScreen(false);});
	};


	this.update = function(){
		
		for(var pID in this.players){
			for(var eID in this.players){
				if(pID != eID){
					game.physics.arcade.collide(this.players[pID],this.players[eID]);
					game.physics.arcade.collide(this.players[pID],this.players[eID].slashes,this.players[eID].hit);
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
// var game = new Phaser.Game(1000,562, Phaser.AUTO, 'game');
game.state.add("ring",ring);
game.state.start("ring");