var playercolor = "";
var playerrole = false;
var playerinteraction = false;
var players;
var game_time = 120;
var gem_list = [];
var nigth = true;
var game_running = false;
var game_end = false;


var loader = new PxLoader(), 
    map = loader.addImage('static/assets/map.png'),
	gem1 = loader.addImage('static/assets/gem1.png'),
	gem2 = loader.addImage('static/assets/gem2.png'),
	gem3 = loader.addImage('static/assets/gem3.png'),
	gem4 = loader.addImage('static/assets/gem4.png'),
	gem5 = loader.addImage('static/assets/gem5.png'),
	gem6 = loader.addImage('static/assets/gem6.png'),
	plant1 = loader.addImage('static/assets/plant1.png'),
	plant2 = loader.addImage('static/assets/plant2.png'),
	statue = loader.addImage('static/assets/statue.png'),
	diamond = loader.addImage('static/assets/diamond.png');


loader.start(); 


var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
socket.on('role', function(role) {
  playerrole = role
  //if (playerrole){
//	  document.getElementById("role").innerHTML = "You are a Thief!";
  //}else{
	//  document.getElementById("role").innerHTML = "You are a Guard!";
  //}
});
socket.on('interaction', function(interaction) {
  playerinteraction = interaction;
});
socket.on('timer', function(time) {
  game_time = time;
});
socket.on('stolen_gems', function(gemlist) {
  gem_list = gemlist;
});

socket.on('requestmovement', function() {
  socket.emit('movement', movement);
});

socket.on('game_end', function(gameend) {
  game_end = gameend;
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false
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
	case 37: // Arrow Left
      movement.left = true;
      break;
    case 38: // Arrow Up 
      movement.up = true;
      break;
    case 39: // Arrow Right
      movement.right = true;
      break;
    case 40: // Arrow Down
      movement.down = true;
      break;
	case 32: // Space bar
	  movement.space = true;
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
	case 37: // Arrow Left
      movement.left = false;
      break;
    case 38: // Arrow Up 
      movement.up = false;
      break;
    case 39: // Arrow Right
      movement.right = false;
      break;
    case 40: // Arrow Down
      movement.down = false;
      break;
	case 32: // Space bar
	  movement.space = false;
	  break;
  }
});

function yellow(){
	playercolor = 'yellow'
	socket.emit('new player', 'yellow', 530, 330);
	//var last = performance.now();
	//setInterval(function() {
	//	console.log(performance.now() - last)
	//  socket.emit('movement', movement);
	//  last = performance.now();
	//}, 1000 / 60);
	document.getElementById("txtcolor").style.display = "none";
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("timer").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function red(){
	playercolor = 'red'
	socket.emit('new player', 'red', 530, 400);
	//var last = performance.now();
	//setInterval(function() {
	//  console.log(performance.now() - last)
	//  socket.emit('movement', movement);
	//  last = performance.now();
	//}, 1000 / 60);
	document.getElementById("txtcolor").style.display = "none";
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("timer").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function green(){
	playercolor = 'green'
	socket.emit('new player', 'green', 730, 330);
	//setInterval(function() {
	//  socket.emit('movement', movement);
	//}, 1000 / 60);
	document.getElementById("txtcolor").style.display = "none";
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("timer").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}

function blue(){
	playercolor = 'blue'
	socket.emit('new player', 'blue', 730, 400);
	//setInterval(function() {
	//  socket.emit('movement', movement);
	//}, 1000 / 60);
	document.getElementById("txtcolor").style.display = "none";
	document.getElementById("btny").style.display = "none";
	document.getElementById("btnr").style.display = "none";
	document.getElementById("btng").style.display = "none";
	document.getElementById("btnb").style.display = "none";
	document.getElementById("role").style.display = "block";
	document.getElementById("timer").style.display = "block";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("filter").style.display = "block";
}


var canvas = document.getElementById('canvas');
canvas.width = 1400;
canvas.height = 800;
var context = canvas.getContext('2d');
context.font = "bold 15px Arial";

var filter = document.getElementById('filter');
filter.width = 1400;
filter.height = 800;
var ctxfilter = filter.getContext('2d');
ctxfilter.font = "bold 35px Arial";


socket.on('state', function(playersdata) {
	players = playersdata
});

socket.on('game_running', function(gamerunning) {
	game_running = gamerunning
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

var timer = document.getElementById("timer");
var role = document.getElementById("role");

function drawscreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  

  timer.innerHTML = get_time();
  
  
  //context.drawImage(diamond, 200, 175);
  context.drawImage(map, 0, 0);
  context.font = "bold 15px Arial";
  
  
  if (gem_list[0]){
	  context.drawImage(gem1, 29, 171);
  }
  if (gem_list[1]){
	  context.drawImage(gem2, 449, 158);
  }
  if (gem_list[2]){
	  context.drawImage(gem3, 1119, 32);
  }
  if (gem_list[3]){
	  context.drawImage(gem4, 1305, 439);
  }
  if (gem_list[4]){
	  context.drawImage(gem5, 772, 706);
  }
  if (gem_list[5]){
	  context.drawImage(gem6, 354, 500);
  }
  
  
  context.drawImage(plant1, 24, 650);
  context.drawImage(plant2, 858, 480);
  context.drawImage(statue, 570, 550);
  
  
  /////////HEREEEEEEEE////
  //context.rect(24, 715, 63, 65);
  //context.rect(856, 534, 63, 65);
  //context.rect(1321, 24, 63, 54);
  //context.rect(570, 610, 90, 60);
  //context.stroke();
  ////////////////////////////////

  
  
  for (var id in players) {
    var player = players[id];
	context.fillStyle = player.color;
    context.beginPath();
    context.arc(player.x, player.y, 15, 0, 2 * Math.PI);
    context.fill();
	if (player.color == playercolor){
		if (player.role){
			role.innerHTML = "You are a Thief!";
		}else{
			role.innerHTML = "You are a Guard!";
		}
		if (playerinteraction){
			context.fillStyle = "white";
			if (player.role){
				context.fillText("Press Space to", player.x - 50, player.y - 40);
				context.fillText("steal the Gem!", player.x - 50, player.y - 20);
			}else{
				context.fillText("Press Space to", player.x - 50, player.y - 40);
				context.fillText("report the robery!", player.x - 50, player.y - 20);
			}
		}
		if (game_time < 110 && game_running){
			dark(player.x+5, player.y+5);
		}else{
			brigth();
		}
		if (!game_running && game_end){
			role.innerHTML = "Waiting for the next game!";
			context.font = "bold 45px Arial";
			context.fillStyle = "white";
			context.fillText("This is the end of the game phase.",350, 100);
			context.fillText("Please return to the group chat.",375, 160);
		}
	}
  }
  

  requestAnimationFrame(drawscreen);
}
requestAnimationFrame(drawscreen);


function dark(x, y){
  // first reset the gCO
  radius = 150;
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

