var images = {};
var totalResources = 9; /* Jump */
var numResourcesLoaded = 0;
var fps = 30;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d");
var charX = 245;
var charY = 185;

var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);

var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);

var jumping = false; /* Jump */

loadImage("torso");
loadImage("head");
loadImage("hair");
loadImage("legs");
loadImage("leftArm");
loadImage("rightArm");
/* Jump */
loadImage("legs-jump");
loadImage("leftArm-jump");
loadImage("rightArm-jump");
/* */

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
	var jumpHeight = 45; /* Jump */

	canvas.width = canvas.width; // clears the canvas
	/* Jump */
	if (jumping) {
		drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
	} else {
		drawEllipse(x + 40, y + 29, 160 - breathAmt, 6);
	}
	if (jumping) {
		y -= jumpHeight;
	}
	/* */
	context.drawImage(images["torso"], x, y - 50);
	context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
	context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
	/* Jump */
	if (jumping) {
		context.drawImage(images["legs-jump"], x, y - 6); /* x - 6, y */
	} else {
		context.drawImage(images["legs"], x, y);
	}
	if (jumping) {
		context.drawImage(images["leftArm-jump"], x + 40, y - 42 - breathAmt);
	} else {
		context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
	}
	if (jumping) {
		context.drawImage(images["rightArm-jump"], x - 35, y - 42 - breathAmt);
	} else {
		context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);
	}
	/* */
	drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
	drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye

}

function drawEllipse(centerX, centerY, width, height) {

	context.beginPath();

	context.moveTo(centerX, centerY - height / 2);

	context.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX
			+ width / 2, centerY + height / 2, centerX, centerY + height / 2);

	context.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX
			- width / 2, centerY - height / 2, centerX, centerY - height / 2);

	context.fillStyle = "black";
	context.fill();
	context.closePath();
}

function updateBreath() {

	if (breathDir === 1) { // breath in
		breathAmt -= breathInc;
		if (breathAmt < -breathMax) {
			breathDir = -1;
		}
	} else { // breath out
		breathAmt += breathInc;
		if (breathAmt > breathMax) {
			breathDir = 1;
		}
	}
}

function updateBlink() {

	eyeOpenTime += blinkUpdateTime;

	if (eyeOpenTime >= timeBtwBlinks) {
		blink();
	}
}

function blink() {

	curEyeHeight -= 1;
	if (curEyeHeight <= 0) {
		eyeOpenTime = 0;
		curEyeHeight = maxEyeHeight;
	} else {
		setTimeout(blink, 10);
	}
}
/* Jump */
function jump() {

	if (!jumping) {
		jumping = true;
		setTimeout(land, 500);
	}
}
function land() {

	jumping = false;
}

canvas.onmousedown = function() {
	jump();
}
/* */
