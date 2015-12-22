var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')

server.listen(8080)

app.use("/src", express.static(path.join(__dirname, 'src')))
app.use("/gfx", express.static(path.join(__dirname, 'gfx')))
app.use("/sfx", express.static(path.join(__dirname, 'sfx')))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
	console.log("Delivered index.html")
})

app.get('/socket.io/socket.io.js', function (req, res) {
	res.sendFile(__dirname + '/nodes_modules/socket.io-client/socket.io.js')
	console.log("Delivered socket.io.js")
})


var players = [];

io.on('connection', function (socket) {
	console.log("Player with "+socket.id+" connected.")
	players.push(socket.id);
	
	//Register the new player to all people in the room.
	socket.emit('join',socket.id);
	
	if(players.length >= 2){
		io.emit('create',players);
	}
	
	//Game events
	socket.on('game', function (data) {
		socket.broadcast.emit('game',data);
		console.log(data)
	})
	
	//Disconnect event
	socket.on('disconnect',function(){
		//Kill people by id
		
		console.log("Player with "+socket.id+" left.")
	})
})