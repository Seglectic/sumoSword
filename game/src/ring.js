/*
		Defines the combat 'ring' for players fight on
		This scene is the main component of the game.
*/

ring = function(){

	this.preload = function(){
		game.load.image("gum","gfx/bubblegum.png");
		game.load.image("slash","gfx/slash.png");

	};


	this.create = function(){
		//Define the 'gum' player character
		this.gum = game.add.sprite(game.width/2-(game.width/4),game.height/2,'gum');
		game.physics.enable(this.gum,Phaser.Physics.ARCADE);
		this.gum.anchor.set(0.5);
		this.gum.body.collideWorldBounds = true;

		this.slashTimer = game.time.now; //Timer for attacks

		//Creates a group of slash sprites to interact with enemy
		this.slashes = game.add.group();
		this.slashes.enableBody= true;
		this.slashes.physicsBodyType = Phaser.Physics.ARCADE;
		this.slashes.createMultiple(4,'slash');
		this.slashes.setAll('anchor.x',0.5);
		this.slashes.setAll('anchor.y',0.5);


		//Defines game controls
		this.controls = game.input.keyboard.createCursorKeys();
		this.atk = game.input.keyboard.addKey(Phaser.Keyboard.Z);

	};

	this.slash = function(){
		if(this.slashTimer>game.time.now){return;}
		this.slashTimer = game.time.now + 250;
		
		var slash = this.slashes.getFirstExists(false);
		if(!slash){return}

		slash.reset(this.gum.x,this.gum.y);
		slash.lifespan = 200;
		slash.body.velocity.x = this.gum.body.velocity.x+230;
		slash.body.velocity.y = this.gum.body.velocity.y;

	}

	this.playerControls = function(){
		var c = this.controls
		if (c.up.isDown){this.gum.body.velocity.y = -200;}
		if (c.down.isDown){this.gum.body.velocity.y = 200;}
		if (c.left.isDown){this.gum.body.velocity.x = -200;}
		if (c.right.isDown){this.gum.body.velocity.x = 200;}
		if (this.atk.isDown){this.slash()}
		if(!c.up.isDown && !c.down.isDown && !c.left.isDown && !c.right.isDown){this.gum.body.velocity.set(0)}
	}

	this.update = function(){
		this.playerControls();

	};


	this.render = function(){


	};

}


var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
game.state.add("ring",ring);
game.state.start("ring");