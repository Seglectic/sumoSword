socket = io();

session = {}

socket.on('connect', function(){
	socket.on('join', function(sessionId){
		game.state.states["ring"].players.push(createPlayer(game.width/2-(game.width/4),game.height/2,'gum',sessionId))
	});
});



