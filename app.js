//<div id="jsDOM">
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<html><body></body></html>');
const window = dom.window;
const document = window.document;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
//</div>
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const readline = require("readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

var player = 1;
console.log("app.js")

app.use("/client", express.static(__dirname + "/client"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

const rl = readline.createInterface({
	input: process.stdin,
});

const handleCommand = (command) => {
	const args = command.split(" ");
	const cmd = args[0];

	if (cmd == "disconnect") {
		var a = args[1];
		for (const id in game.players) {
			if (game.players[id].name === a) {
				const socket = io.sockets.sockets.get(id);
				if (socket) {
					console.log(
						`[Commands] Disconnect: Manually disconnected ${game.players[id].name}`
					);
					socket.emit("disconnectMe", {
						reason: "manually disconnected",
					});
					socket.disconnect();
				} else {
					console.log("[Commands] Disconnect: Socket not found for player");
				}
				break;
			}
		}
	} else if (cmd == "quit") {
		io.close();
		process.exit();
	} else {
		console.log("[Commands] unknown command");
	}
};

rl.on("line", (input) => {
	handleCommand(input);
});

let game = {
	players: {},
};

io.on("connection", (socket) => {
	game.players[socket.id] = {
		x: Math.floor(Math.floor(Math.random() * 975) / 5) * 5,
		y: Math.floor(Math.floor(Math.random() * 775) / 5) * 5,
		speed: 5,
		name: "",
		number: player,
	};
	socket.on("name", (data) => {
		game.players[socket.id].name = data;
		console.log(
			`[Connections] ${game.players[socket.id].name} (${socket.id}) connected`
		);
		socket.emit("currentGame", game);
		socket.broadcast.emit("newPlayer", {
			id: socket.id,
			obj: game.players[socket.id],
		});
	});
	socket.on("move", (data) => {
		game.players[socket.id].x = data.x;
		game.players[socket.id].y = data.y;
		io.emit("playerMoved", {
			x: data.x,
			y: data.y,
			id: socket.id,
		});
	});

	socket.on("disconnect", () => {
		console.log(
			`[Connections] ${game.players[socket.id].name} (${
				socket.id
			}) disconnected`
		);
		io.emit("playerDisconnect", socket.id);
		delete game.players[socket.id];
	});
	player - 1;
});

server.listen(5767, () => {
	console.log("[Server] Listening on PORT 5767");
});
//<div id=banana>
const { Image } = require('canvas');
const { waitForDebugger } = require('inspector');

const banan = new Image();
banan.src = "/client/banana.png";
var bananActive = false;
var cooldown = 15;
var player1score = 0;
var player0score = 0;
var p1list;
var p0list;
var apupdown = getRandomInt(1000000);
var apleftright = getRandomInt(1000000);
var p1x;
var p1y;
var p0x;
var p0y;
window.playerTook;
const cnv = document.querySelector("canvas");

setInterval(function() {
  cooldown--;
  bananActive = false;

  if (cooldown === 0) {
    createTastyBanana();
  }
}, 1000);
let height = 100;
const myFunction = () => {
	// You can access bananListClient here
	console.log(bananListClient.taken);
  };
let width = 100;
const bananList = {x: apupdown, y: apleftright, height: 100, width: 100, taken: true};
 window.bananListClient = bananList;
function createTastyBanana(){
  ctx.drawImage(banan, apupdown, apleftright);
  bananList.taken = false;
  
}
//we could also make some more instructions on how to play and stuff.
//I made the code in this way so that there is a zone that you have to
//defend to get more bananas and not be boring.
function areElementsTouching(element1, element2) {
  const x1 = element1.x;
  const y1 = element1.y;
  const width1 = element1.width;
  const height1 = element1.height;

  const x2 = element2.x;
  const y2 = element2.y;
  const width2 = element2.width;
  const height2 = element2.height;

  return   !(x1 + width1 / 2 < x2 - width2 / 2 ||
         x1 - width1 / 2 > x2 + width2 / 2 ||
         y1 + height1 / 2 < y2 - height2 / 2 ||
         y1 - height1 / 2 > y2 + height2 / 2);
}


setInterval(updateBananState, 500);
function updateBananState(){
for (var p of Object.keys(game.players)) {
  if (p.number == 0) {
    p0x = p.x;
    p0y = p.y;
  }
  for (var p of Object.keys(game.players)) {
	if (p.number == 1) {
	  p1x = p.x;
	  p1y = p.y;
	}
  }
p1list = {x: p1x, y: p1y, height: 25, width: 25};
p0list = {x: p0x, y: p0y, height: 25, width: 25};
if (areElementsTouching(p1list, bananList)) {
  if (bananActive == true){
    bananActive = false;
    player1up(1);
	window.playerTook = 1;
	console.log("Banana gained sucessfully to code 1")
	bananList.taken = true;
	setTimeout(tookToNull, 400)
   //Cube and banana are touching
  }
}
if (areElementsTouching(p0list, bananList)) {
	if (bananActive == true){
		bananActive = false;
		player0up(0);
		console.log("Banana  gained sucessfully to code 0");
		bananList.taken = true;
		window.playerTook = 0;
		setTimeout(tookToNull, 400)
   //Cube and banana are touching
}
}
}
function tookToNull(){
	tookTo(null);
}
function tookTo(value){
	window.playerTook = value;
}
window.bananListClient = bananList;
}
function bananReset(){
cooldown = 15
ctx.clearRect(bananList)
}
function player1up(banan){
player1score = player1score + banan;
document.getElementById("p1s").textContent = player1score;
bananReset();
}
function player0up(banan0){
player0score = player0score + banan0
document.getElementById("p0s").textContent = player1score;
bananReset();
}
function findPlayerByNumber(){
  for (const id in game.players) {
  if (game.players[id].number === number){
    return game.players [id];
}
}
return null;
}
function getRandomInt(max){
	Math.floor(Math.random * max);
}

const p1AndBanan = [
  { x: p1x, y: p1y, width: 25, height: 25 },
  { x: apupdown, y: apleftright, width: 100, height: 100 }
 ];
const p0AndBanan= [
  { x: p0x, y: p1y, width: 25, height: 25 },
  { x: apupdown, y: apleftright, width: 100, height: 100 }
 ];
//</div>
