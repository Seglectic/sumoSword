session = {}

window.setTimeout(function(){

	socket = io();
	
	socket.on('connect', function(){
		socket.on('join', function(sessionId){
			session.id = sessionId
			console.log(session.id)
		});
		
		socket.on('create',function(players){
			console.log("Creating game session")
			
			for(var player of players){
				console.log("Create "+player);
				game.state.states["ring"].players.add( createPlayer(game.world.width/2-(game.world.width/4),game.world.height/2,'gum',player) )
			}
		})

		socket.on('game',function(data){
			if(data.type == "move"){
				//console.log("Recieved move broadcast")
				var changedPlayer = game.state.states["ring"].players[data.player]
				console.log(data.player);

				if (data.frame == 2){
					changedPlayer.body.velocity.y += -changedPlayer.runSpeed;
					changedPlayer.dir = 'up';
				}
				else if(data.frame == 0){
					changedPlayer.body.velocity.y += changedPlayer.runSpeed;
					changedPlayer.dir = 'down';
				}
				else if(data.frame == 3){
					changedPlayer.body.velocity.x += -changedPlayer.runSpeed;
					changedPlayer.dir = 'left';
				}
				else if(data.frame == 1){
					changedPlayer.body.velocity.x += changedPlayer.runSpeed;
					changedPlayer.dir = 'right';
				}
				changedPlayer.frame = data.frame;
			}
		})

	});
	
}, 500);
