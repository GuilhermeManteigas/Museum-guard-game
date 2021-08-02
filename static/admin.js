var socket = io();
var players;

//Receive
//socket.on('message', function(data) {
//  console.log(data);
//});

//Send
//socket.emit('movement', movement);

socket.on('state', function(playersdata) {
	players = playersdata
});

function update_status(){
	document.getElementById("status").innerHTML = "Yellow";
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
	  
	  
	  
}, 1000);

