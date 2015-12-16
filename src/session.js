session = {}

window.setTimeout(function(){

	socket = io();
	
	socket.on('connect', function(){
		socket.on('join', function(sessionId){
			session.id = sessionId
		});
		
		socket.on('create',function(players){
			console.log("Creating game session")
			
			for(var player of players){
				console.log("Create "+player);
				game.state.states["ring"].players.push(createPlayer(game.width/2-(game.width/4),game.height/2,'gum',player))
			}
		})
	});
	
}, 500);
