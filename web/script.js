
template = function(){

	this.preload = function(){


	};


	this.create = function(){

	};

	this.update = function(){


	};


	this.render = function(){


	};

}


var game = new Phaser.Game(window.innerWidth-18,window.innerHeight-17, Phaser.AUTO, 'game');
game.state.add("template",template);
game.state.start("template");