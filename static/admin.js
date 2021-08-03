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

