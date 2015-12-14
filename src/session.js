socket = io();

session = {}

socket.on('join', function(sessionId){
	console.log("Joining game...")
	//ring.players.push(createPlayer(game.width/2-(game.width/4),game.height/2,'gum',sessionId))
});