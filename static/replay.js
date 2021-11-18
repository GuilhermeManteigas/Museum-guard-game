var playercolor = "";
var playerrole = false;
var playerinteraction = false;
var players = [];
var gamemoves = [];
var game_time = 120;
var gem_list = [];
var nigth = true;
var game_running = false;
var game_end = false;
var playbacktime = 0;
var running = false;


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



function drawscreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  
  
  //context.drawImage(diamond, 200, 175);
  context.drawImage(map, 0, 0);
  context.font = "bold 15px Arial";
  
  
	context.drawImage(gem1, 29, 171);
	context.drawImage(gem2, 449, 158);
	context.drawImage(gem3, 1119, 32);
	context.drawImage(gem4, 1305, 439);
	context.drawImage(gem5, 772, 706);
	context.drawImage(gem6, 354, 500);

  
  //console.log("0"); 
  console.log(players); 
  for (var player in players) {
	//console.log("1"); 
    //var player = players[id];
	context.fillStyle = players[player].color;
    context.beginPath();
    context.arc(players[player].x, players[player].y, 15, 0, 2 * Math.PI);
    context.fill();
	//console.log("2");
  }
  //console.log("0.5"); 

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

function playpause(){
	if(running){
		running = false;
	}else{
		running = true;
	}
}

function loadlogs(){
	gameslog = document.getElementById("log").value.split("\n");
	//console.log(document.getElementById("log").value.split("\n"));
	//txt = "";
	//console.log(gameslog); 
	for (var line in gameslog) {
		//console.log(gameslog[line]);
		var p = gameslog[line].split("|");
		//console.log(line); 
		//for (var line in gameslog) {
			//console.log("p number"); 
		//}
		players = [];
		for (var c = 0; c < 4; c++){
			//console.log("c"); 
			temp = p[c].split(",")
			//console.log(temp);
			if (temp.length > 1){
				players[c] = {
				  x: temp[1],
				  y: temp[2],
				  color: temp[0],
				  role: temp[3]
				};
			}
		}
		gamemoves.push(players);
	}
	console.log(gamemoves);
	
}



setInterval(function() {
	if (running){
		
		players = gamemoves[playbacktime];
		console.log(players);
		playbacktime++;

		
	}
}, 1000/60);
