var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var charX = 245;
var charY = 185;

loadImage("torso");
loadImage("head");
loadImage("hair");
loadImage("legs");
loadImage("leftArm");
loadImage("rightArm");

function loadImage(name) {

	images[name] = new Image();
	images[name].onload = function() {
		resourceLoaded();
	}
	images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

	numResourcesLoaded += 1;
	if (numResourcesLoaded === totalResources) {
		setInterval(redraw, 1000 / fps);
	}
}

function redraw() {

	var x = charX;
	var y = charY;

	canvas.width = canvas.width; // clears the canvas

	context.drawImage(images["torso"], x, y - 50);
	context.drawImage(images["head"], x - 10, y - 125);
	context.drawImage(images["hair"], x - 37, y - 138);
	context.drawImage(images["legs"], x, y);
	context.drawImage(images["leftArm"], x + 40, y - 42);
	context.drawImage(images["rightArm"], x - 15, y - 42);
}