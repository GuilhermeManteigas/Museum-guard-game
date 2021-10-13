// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 80);
app.use('/static', express.static(__dirname + '/static'));
//app.use(express.static(__dirname + "/static"));



canvaswidth = 1400;
canvasheight = 800;
player_margin = 15;

game_randomness = ['yellow','red','green','blue','yellow','red']; //Total 6 games
game_number = 0;
game_started = false;
game_length = 120;
game_time = game_length;
game_end = false;
gameslog = [];
game = [];

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/admin', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/admin.html'));
});


// Starts the server.
server.listen(80, function() {
  console.log('Starting server on port 80');
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
});

//setInterval(function() {
//  io.sockets.emit('message', 'hi!');
//}, 1000);

setInterval(function() {
 if (game_started && game_time > 0){
	 io.sockets.emit('timer', game_time)
	 game_time--;
	 if (game_time <= 0){
		 //
		 //GAME ENDED!!!!
		 //Call game end function
		 //
		 io.sockets.emit('timer', game_time)
		 newgame();
	 }
 }
}, 1000);

var players = {};
io.on('connection', function(socket) {
  socket.on('new player', (pcolor, px, py) => {
    players[socket.id] = {
      x: px,
      y: py,
	  color: pcolor,
	  role: false
    };
	if (players[socket.id].color == game_randomness[game_number]){
		players[socket.id].role = true;
		io.to(socket.id).emit('role', true);
	}else{
		io.to(socket.id).emit('role', false);
	}
	//Starts game if 4 players connected
	if (Object.keys(players).length == 4){
		//game_started = true;
	}
  });
  socket.on('disconnect', function(){
    delete players[socket.id];
  });
  socket.on('start_round', function(bool){
    game_started = true;
	game_end = false;
  });
  socket.on('restart_experiment', function(){
	game_randomness = ['yellow','red','green','blue','yellow','red']; //Total 6 games
	game_number = 0;
	game_started = false;
	game_length = 120;
	game_time = game_length;
	game_end = false;
	gameslog = [];
	game = [];
	stolen_list = [true,true,true,true,true,true];
	for (var id in players) {
		var player = players[id];
		player.role = false;
		if (player.color == "yellow"){
			player.x = 530;
			player.y = 330;
		}else if (player.color == "red"){
			player.x = 530;
			player.y = 400;
		}else if (player.color == "green"){
			player.x = 730;
			player.y = 330;
		}else if (player.color == "blue"){
			player.x = 730;
			player.y = 400;
		}
		if (player.color == game_randomness[game_number]){
			player.role = true;
		}
	}
  });
  socket.on('redo_round', function(){
    gameslog[game_number-1] = [];
	game_number--;
	game_number--;
	newgame();
	
  });
  socket.on('movement', function(data) {
	  if (game_started){
		var player = players[socket.id] || {};
		if (data.left) {
			if (!check_colisions(player.x - 5, player.y)){
				player.x -= 5;
			}
			//player.x -= 5;
		}
		if (data.up) {
			if (!check_colisions(player.x, player.y - 5)){
				player.y -= 5;
			}
		  //player.y -= 5;
		}
		if (data.right) {
			if (!check_colisions(player.x + 5, player.y)){
				player.x += 5;
			}
		  //player.x += 5;
		}
		if (data.down) {
			if (!check_colisions(player.x, player.y + 5)){
				player.y += 5;
			}
		  //player.y += 5;
		}
		if (data.space) {
			//Player press space
			if (check_interaction(player.x, player.y, socket.id)){
				//console.log("1");
				if (player.role){
					steal_gem(player.x, player.y, socket.id);
				}else{
					if (check_crime(player.x, player.y)){
						newgame();
					}
				}
			}
			
		}
		
		if (player.x >= canvaswidth - 25 - player_margin) {
			player.x = canvaswidth - 25 - player_margin;
		} else if (player.x <= 25 + player_margin) {
			player.x = 25 + player_margin;
		}

		if (player.y > canvasheight - 25 - player_margin) {
			player.y = canvasheight - 25 - player_margin;
		} else if (player.y <= 25 + player_margin) {
			player.y = 25 + player_margin;
		}
		
		if (player.role){
			if (check_crime(player.x, player.y)){
				io.to(socket.id).emit('interaction', false);
			}else{
				io.to(socket.id).emit('interaction', check_interaction(player.x, player.y, socket.id));
			}
			//io.to(socket.id).emit('interaction', check_interaction(player.x, player.y, socket.id));
		}else{
			if (check_crime(player.x, player.y)){
				io.to(socket.id).emit('interaction', check_interaction(player.x, player.y, socket.id));
			}else{
				io.to(socket.id).emit('interaction', false);
			}
		}
			
	  }
	  
  });
});


colision_list = [[311, 98, 337, 117],[311, 114, 446, 140],[420, 138, 446, 311],[420, 385, 446, 636],[420, 712, 446, 782],[445, 225, 600, 251],[675, 225, 1249, 251],[1326, 225, 1386, 251],[24, 471, 69, 497],[142, 471, 594, 497],[670, 471, 857, 497],[831, 250, 857, 320],[831, 395, 857, 615],[831, 593, 1134, 619],[1108, 593, 1134, 677],[1108, 750, 1134, 780],[947, 20, 973, 99],[889, 73, 969, 99],[947, 155, 973, 235],[889, 155, 969, 181],[25, 171, 92, 234],[445, 158, 512, 225],[1119, 25, 1182, 95],[1305, 439, 1375, 502],[772, 706, 835, 776],[354, 496, 421, 563]];
function check_colisions(x, y){
	var colision = false;
	for (let i = 0; i < colision_list.length; i++) {
		//if ((colision_list[i][0] < x && x < colision_list[i][2]) && (colision_list[i][1] < y && y < colision_list[i][3])){
		if ((colision_list[i][0] - player_margin < x && x < colision_list[i][2] + player_margin) && (colision_list[i][1] - player_margin < y && y < colision_list[i][3] + player_margin)){
			colision = true;
		}
	}
	return colision;
}

interaction_list = [[25, 171, 92, 234],[445, 158, 512, 225],[1119, 25, 1182, 95],[1305, 439, 1375, 502],[772, 706, 835, 776],[354, 496, 421, 563]]
function check_interaction(x, y){
	var interaction = false;
	for (let i = 0; i < interaction_list.length; i++) {
		//if ((colision_list[i][0] < x && x < colision_list[i][2]) && (colision_list[i][1] < y && y < colision_list[i][3])){
		if ((interaction_list[i][0] - player_margin*2 < x && x < interaction_list[i][2] + player_margin*3) && (interaction_list[i][1] - player_margin*2 < y && y < interaction_list[i][3] + player_margin*3)){
			interaction = true;
		}
	}
	return interaction;
}

//stolen_list = [[25, 171, 92, 234],[445, 158, 512, 225],[1119, 25, 1182, 95],[1305, 439, 1375, 502],[772, 706, 835, 776],[354, 496, 421, 563]]
var stolen_list = [true,true,true,true,true,true]
function steal_gem(x, y, socketId){
	for (let i = 0; i < interaction_list.length; i++) {
		if ((interaction_list[i][0] - player_margin*2 < x && x < interaction_list[i][2] + player_margin*3) && (interaction_list[i][1] - player_margin*2 < y && y < interaction_list[i][3] + player_margin*3)){
			stolen_list[i] = false;
			//console.log(gems);
			//stolen_list.push(interaction_list[i]);
			//var idx = stolen_list.indexOf(interaction_list[i]);
			//stolen_list.splice(idx, 1);
			//console.log(stolen_list);
			//for (let j = 0; j < stolen_list.length; j++) {
			//	if (interaction_list[i] == stolen_list[j]){
			//		stolen_list.splice(j, 1);
			//		console.log(stolen_list);
			//	}
			//}
		}
	}
}

function check_crime(x, y){
	for (let i = 0; i < interaction_list.length; i++) {
		if ((interaction_list[i][0] - player_margin*2 < x && x < interaction_list[i][2] + player_margin*3) && (interaction_list[i][1] - player_margin*2 < y && y < interaction_list[i][3] + player_margin*3)){
			if(stolen_list[i] == false){
				//
				//
				// Crime Reported
				//
				//
				//newgame();
				return true;
			}
			
		}
	}
	return false;
}


setInterval(function() {
  io.sockets.emit('stolen_gems', stolen_list);
  //console.log(stolen_list);
}, 1000 / 60);

setInterval(function() {
	io.sockets.emit('state', players);
}, 1000 / 60);

setInterval(function() {
	io.sockets.emit('game_running', game_started);
}, 1000 / 60);

setInterval(function() {
	io.sockets.emit('game_end', game_end);
}, 1000 / 60);


setInterval(function() {
	//console.log("==========")
	//console.log("Time: ", game_time)
	if (game_started && game_time > 0){
		//gameslog[0].push(players);
		var temp = []
		for (var id in players) {
			var player = players[id];
			temp.push([player.color, player.x, player.y, player.role]);
		}
		game.push(temp);
	}else if (game_started == false){
		//io.sockets.emit('message', 'log!!!!');
		gameslog.push(game);
		game = []
		io.sockets.emit('log', gameslog);
	}
	//console.log("==========")
	
}, 1000);




function savejson(){
	//var jsonString = JSON.stringify(gamelogs);
}


function newgame(){
	game_started = false;
	game_end = true;
	game_time = game_length;
	game_number++;
	for (var id in players) {
		var player = players[id];
		player.role = false;
		if (player.color == "yellow"){
			player.x = 530;
			player.y = 330;
		}else if (player.color == "red"){
			player.x = 530;
			player.y = 400;
		}else if (player.color == "green"){
			player.x = 730;
			player.y = 330;
		}else if (player.color == "blue"){
			player.x = 730;
			player.y = 400;
		}
		if (player.color == game_randomness[game_number]){
			player.role = true;
		}
		//RESET GEMS HERE
		stolen_list = [true,true,true,true,true,true];
		
  }
	
	
}


setInterval(function() {
  io.sockets.emit('status', game_started, game_number);
}, 1000 / 60);


// Requests movemnts (allows for same speed for everyone)
setInterval(function() {
	io.sockets.emit('requestmovement');
}, 1000 / 60);

