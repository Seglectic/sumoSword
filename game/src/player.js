/*
	Returns a character entity to be controlled by a player
*/



createPlayer =  function(x,y,name,controlling){
	var player = game.add.sprite(x,y,name,0);
	game.physics.enable(player,Phaser.Physics.ARCADE);
	player.anchor.set(0.5);
	player.body.collideWorldBounds = true;

	player.slashTimer = game.time.now; //Timer for attacks

	//Creates a group of slash sprites to interact with enemy
	player.slashes = game.add.group();
	player.slashes.enableBody= true;
	player.slashes.physicsBodyType = Phaser.Physics.ARCADE;
	player.slashes.createMultiple(4,'slash');
	player.slashes.setAll('anchor.x',0.5);
	player.slashes.setAll('anchor.y',0.5);
	player.scale.set(2.5)
	player.smoothed = false
	//Defines game controls
	player.cursors = game.input.keyboard.createCursorKeys();
	player.atk = game.input.keyboard.addKey(Phaser.Keyboard.Z);

	//Direction to govern animations
	player.dir = "down"


	player.slash = function(){
		if(player.slashTimer>game.time.now){return;}
		var slash = player.slashes.getFirstExists(false);
		if(!slash){return}
		player.slashTimer = game.time.now + 350;

		slash.reset(player.x,player.y);

		if(player.dir=="up"){
			slash.frame = 3;
			slash.body.velocity.x = player.body.velocity.x;
			slash.body.velocity.y = player.body.velocity.y-230;
		}
		if(player.dir=="down"){
			slash.frame = 1;
			slash.body.velocity.x = player.body.velocity.x
			slash.body.velocity.y = player.body.velocity.y+230;
		}
		if(player.dir=="left"){
			slash.frame = 2;
			slash.body.velocity.x = player.body.velocity.x-230;
			slash.body.velocity.y = player.body.velocity.y;
		}
		if(player.dir=="right"){
			slash.frame = 0;
			slash.body.velocity.x = player.body.velocity.x+230;
			slash.body.velocity.y = player.body.velocity.y;
		}
		slash.lifespan = 200;
	}


	player.controls = function(){
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if(!controlling){return;}
		var c = player.cursors
		if (c.up.isDown){
			player.body.velocity.y += -200;
			player.dir = "up";
			player.frame = 2;
		}
		if (c.down.isDown){
			player.body.velocity.y += 200;
			player.dir = "down";
			player.frame = 0;
		}
		if (c.left.isDown){
			player.body.velocity.x += -200;
			player.dir = "left";
			player.frame = 1;
		}
		if (c.right.isDown){
			player.body.velocity.x += 200;
			player.dir = "right";
			player.frame = 3;
		}
		if (player.atk.isDown){player.slash()}
		if(!c.up.isDown && !c.down.isDown && !c.left.isDown && !c.right.isDown){player.body.velocity.set(0)}
	}


	player.update = function(){
		player.controls();
	}

	return player

}