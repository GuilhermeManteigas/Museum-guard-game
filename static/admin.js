var socket = io();
var players;
var game_time = 120;

//Receive
//socket.on('message', function(data) {
//  console.log(data);
//});

//Send
//socket.emit('movement', movement);

socket.on('state', function(playersdata) {
	players = playersdata
});

socket.on('timer', function(time) {
  game_time = time
});

socket.on('status', function(game_started,gamelogslength) {
	if (game_started){
		document.getElementById("status").innerHTML = "Current Game status: Playing";
	}else{
		document.getElementById("status").innerHTML = "Current Game status: Stopped";
	}
	for (i =0;i <= gamelogslength; i++){
		number =i + 1;
		//var name = "game" + i
		document.getElementById("game"+number).classList.remove('btn-danger');
		document.getElementById("game"+number).classList.add('btn-success');
	}
	document.getElementById("game"+(gamelogslength+1)).classList.remove('btn-danger');
	document.getElementById("game"+(gamelogslength+1)).classList.remove('btn-success');
	document.getElementById("game"+(gamelogslength+1)).classList.add('btn-warning');
});

socket.on('log', function(gameslog) {
	txt = "";
	for (var i = 0; i < gameslog.length; i++){
		for (var j = 0; j < gameslog[i].length; j++){
			for (var c = 0; c < 4; c++){
				txt = txt + gameslog[i][j][c] + "  ";
			}
			txt = txt + "\n";
			//txt = txt + gameslog[i][j][0] + "\n";//": x = " + gameslog[i][j][1] + "  y = " + gameslog[i][j][2] + "\n";
			//[player.color, player.x, player.y, player.role]
		}
	}
	document.getElementById("log").innerHTML = txt;
});

function get_time(){
	if (game_time >= 130){
		return "02:" + (game_time - 120);
	}else if (game_time >= 120){
		return "02:0" + (game_time - 120);
	}else if (game_time >= 70){
		return  "01:" + (game_time - 60);
	}else if (game_time >= 60){
		return  "01:0" + (game_time - 60);
	}else if (game_time >= 10){
		return  "00:" + game_time;
	}else{
		return  "00:0" + game_time;
	}
}

setInterval(function() {
	  
	document.getElementById("yellowstatus").classList.remove('btn-success');
	document.getElementById("yellowstatus").classList.add('btn-danger');
	
	document.getElementById("redstatus").classList.remove('btn-success');
	document.getElementById("redstatus").classList.add('btn-danger');
	
	document.getElementById("greenstatus").classList.remove('btn-success');
	document.getElementById("greenstatus").classList.add('btn-danger');
	
	document.getElementById("bluestatus").classList.remove('btn-success');
	document.getElementById("bluestatus").classList.add('btn-danger');
		
	for (var id in players) {
		var player = players[id];
		if (player.color == "yellow"){
			document.getElementById("yellowstatus").classList.remove('btn-danger');
			document.getElementById("yellowstatus").classList.add('btn-success');
		}else if (player.color == "red"){
			document.getElementById("redstatus").classList.remove('btn-danger');
			document.getElementById("redstatus").classList.add('btn-success');
		}else if (player.color == "green"){
			document.getElementById("greenstatus").classList.remove('btn-danger');
			document.getElementById("greenstatus").classList.add('btn-success');
		}else if (player.color == "blue"){
			document.getElementById("bluestatus").classList.remove('btn-danger');
			document.getElementById("bluestatus").classList.add('btn-success');
		}
	}
	
	document.getElementById("timer").innerHTML = "Time left: " + get_time() ;
	  
	  
}, 1000);

