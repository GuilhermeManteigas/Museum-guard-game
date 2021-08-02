var socket = io();
players

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