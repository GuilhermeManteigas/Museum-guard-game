var playercolor = "";
var playerrole = false;
var playerinteraction = false;
var players;
var game_time = 0;


var loader = new PxLoader(), 
    map = loader.addImage('static/assets/map.png'),
	gem1 = loader.addImage('static/assets/gem1.png'),
	gem2 = loader.addImage('static/assets/gem2.png'),
	gem3 = loader.addImage('static/assets/gem3.png'),
	gem4 = loader.addImage('static/assets/gem4.png'),
	gem5 = loader.addImage('static/assets/gem5.png'),
	gem6 = loader.addImage('static/assets/gem6.png'),
	diamond = loader.addImage('static/assets/diamond.png');


loader.start(); 


var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
socket.on('role', function(role) {
  playerrole = role
  if (playerrole){
	  document.getElementById("role").innerHTML = "You are a Burglar!";
  }else{
	  document.getElementById("role").innerHTML = "You are a Guard!";
  }
});
socket.on('interaction', function(interaction) {
  playerinteraction = interaction
});
socket.on('timer', function(time) {
  game_time = time
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

function yellow(){
	playercolor = 'yellow'
	socket.emit('new player', 'yellow', 530, 330);
	setInterval(function() {
	  socket.emit('movement', movement);
	}, 1000 / 60);
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function red(){
	playercolor = 'red'
	socket.emit('new player', 'red', 530, 400);
	setInterval(function() {
	  socket.emit('movement', movement);
	}, 1000 / 60);
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function green(){
	playercolor = 'green'
	socket.emit('new player', 'green', 730, 330);
	setInterval(function() {
	  socket.emit('movement', movement);
	}, 1000 / 60);
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function blue(){
	playercolor = 'blue'
	socket.emit('new player', 'blue', 730, 400);
	setInterval(function() {
	  socket.emit('movement', movement);
	}, 1000 / 60);
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}



//socket.emit('new player', 'red');
//setInterval(function() {
//  socket.emit('movement', movement);
//}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 1400;
canvas.height = 800;
var context = canvas.getContext('2d');
context.font = "bold 15px Arial";

var filter = document.getElementById('filter');
filter.width = 1400;
filter.height = 800;
var ctxfilter = filter.getContext('2d');

//var image = new Image();
//image.src = "/static/assets/diamond.png";

socket.on('state', function(playersdata) {
	
	players = playersdata
	
  //context.clearRect(0, 0, canvas.width, canvas.height);
  
  //context.drawImage(diamond, 200, 175);
  //context.drawImage(map, 0, 0);
  
  //context.drawImage(gem1, 29, 171);
  //context.drawImage(gem2, 449, 158);
  //context.drawImage(gem3, 1119, 32);
  //context.drawImage(gem4, 1305, 439);
  //context.drawImage(gem5, 772, 706);
  //context.drawImage(gem6, 354, 500);
  
  
  //for (var id in players) {
    //var player = players[id];
	//context.fillStyle = player.color;
    //context.beginPath();
    //context.arc(player.x, player.y, 15, 0, 2 * Math.PI);
    //context.fill();
	//if (player.color == playercolor){
		//if (playerinteraction){
			//context.fillStyle = "white";
			//if (playerrole){
				//context.fillText("Press Space to steal the Gem!", player.x + 20, player.y - 20);
			//	context.fillText("Press Space to", player.x - 50, player.y - 40);
			//	context.fillText("steal the Gem!", player.x - 50, player.y - 20);
			//}else{
				//context.fillText("Press Space to report the robery!", player.x + 20, player.y - 20);
			//}
		//}
		//dark(player.x+5, player.y+5);
	//}
  //}
  
  
  
  
  //TESTE
  //context.fillRect(311, 98, 26, 19); // done
  //context.fillRect(311, 114, 135, 26);
  //context.fillRect(420, 138, 26, 173);
  //context.fillRect(420, 385, 26, 251);
  //context.fillRect(420, 712, 26, 70);
  //context.fillRect(445, 225, 155, 26);
  //context.fillRect(675, 225, 574, 26);
  //context.fillRect(1326, 225, 60, 26);
  //context.fillRect(24, 471, 45, 26);
  //context.fillRect(142, 471, 452, 26);
  //context.fillRect(670, 471, 187, 26);
  //context.fillRect(831, 250, 26, 70);
  //context.fillRect(831, 395, 26, 220);
  //context.fillRect(831, 593, 303, 26);
  //context.fillRect(1108, 593, 26, 84);
  //context.fillRect(1108, 750, 26, 30);
  //context.fillRect(947, 20, 26, 79);
  //context.fillRect(889, 73, 80, 26);
  //context.fillRect(947, 155, 26, 80);
  //context.fillRect(889, 155, 80, 26);
  
  //context.fillRect(25, 171, 67, 63);
  //context.fillRect(445, 158, 67, 67);
  //context.fillRect(1119, 25, 63, 70);
  //context.fillRect(1305, 439, 70, 63);
  //context.fillRect(772, 706, 63, 70);
  //context.fillRect(354, 496, 67, 67);
  
 
  
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

function drawscreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  

  document.getElementById("timer").innerHTML = get_time();
  
  
  //context.drawImage(diamond, 200, 175);
  context.drawImage(map, 0, 0);
  
  context.drawImage(gem1, 29, 171);
  context.drawImage(gem2, 449, 158);
  context.drawImage(gem3, 1119, 32);
  context.drawImage(gem4, 1305, 439);
  context.drawImage(gem5, 772, 706);
  context.drawImage(gem6, 354, 500);
  
  
  for (var id in players) {
    var player = players[id];
	context.fillStyle = player.color;
    context.beginPath();
    context.arc(player.x, player.y, 15, 0, 2 * Math.PI);
    context.fill();
	if (player.color == playercolor){
		if (playerinteraction){
			context.fillStyle = "white";
			if (playerrole){
				//context.fillText("Press Space to steal the Gem!", player.x + 20, player.y - 20);
				context.fillText("Press Space to", player.x - 50, player.y - 40);
				context.fillText("steal the Gem!", player.x - 50, player.y - 20);
			}else{
				context.fillText("Press Space to report the robery!", player.x + 20, player.y - 20);
			}
		}
		//dark(player.x+5, player.y+5);
	}
  }
  
  
  requestAnimationFrame(drawscreen);
}
requestAnimationFrame(drawscreen);


function dark(x, y){
  // first reset the gCO
  radius = 120;
  ctxfilter.globalCompositeOperation = 'source-over';
  // Paint the canvas black.
  ctxfilter.fillStyle = '#000';
  ctxfilter.clearRect(0, 0, filter.width, filter.height);
  ctxfilter.fillRect(0, 0, filter.width, filter.height);

  ctxfilter.beginPath();
  radialGradient = ctxfilter.createRadialGradient(x, y, 1, x, y, radius);
  radialGradient.addColorStop(0, 'rgba(255,255,255,1)');
  radialGradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctxfilter.globalCompositeOperation = "destination-out";

  ctxfilter.fillStyle = radialGradient;
  ctxfilter.arc(x, y, radius, 0, Math.PI*2, false);
  ctxfilter.fill();
  
  ctxfilter.closePath();
}

function brigth(){
	ctxfilter.clearRect(0, 0, filter.width, filter.height);
}

//function getCursorPosition(canvas, event) {
//    const rect = canvas.getBoundingClientRect()
//    const x = event.clientX - rect.left
//    const y = event.clientY - rect.top
//    console.log(x + ", " + y)
//}

//const canvas = document.querySelector('canvas')
//canvas.addEventListener('mousedown', function(e) {
//    getCursorPosition(canvas, e)
//})

