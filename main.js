// Functions on Mouse Management
function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
		y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
	};
}

// Functions on Window Size Management
function windowtoTiles()
{
	WIDTH_TILE = canvas.width / TILENO;
	HEIGHT_TILE = canvas.height / TILENO;
	console.log("WIDTH_TILE: ", WIDTH_TILE)
	console.log("HEIGHT_TILE: ", HEIGHT_TILE)
}

function resizeCanvas() 
{
	windowtoTiles();
	CANVAS.width = window.innerWidth;
	if(CANVAS.width > 1000) CANVAS.width = 1000;
	CANVAS.height = window.innerHeight;
	if(CANVAS.height > 500) CANVAS.height = 500;
	SCREEN_RATE = CANVAS.width / CANVAS.height;
	SHAPELIST["player1"].x = WIDTH_TILE;
	SHAPELIST["player1"].y = HEIGHT_TILE * TILENO / 2; // problem
	SHAPELIST["player2"].x = CANVAS.width - 2 * WIDTH_TILE;
	SHAPELIST["player2"].y = HEIGHT_TILE * TILENO / 2; // problem
	redraw();
}

// Functions on Drawing Management
function redraw() 
{
	CONTEXT.strokeStyle = 'blue';
	CONTEXT.lineWidth = '5';
	CONTEXT.strokeRect(0, 0, CANVAS.width, CANVAS.height);
	drawRectangle(SHAPELIST["player1"]);
	drawRectangle(SHAPELIST["player2"]);
	drawSquare(SHAPELIST["hockey"]);
}

function drawRectangle(obj)
{
	CONTEXT.beginPath();
	CONTEXT.rect(obj.x, obj.y, WIDTH_TILE, 2 * HEIGHT_TILE * SCREEN_RATE);
	CONTEXT.fillStyle = 'black';
	CONTEXT.fill();
	CONTEXT.strokeStyle = 'red';
	CONTEXT.stroke();
}

function drawSquare(obj)
{
	CONTEXT.beginPath();
	CONTEXT.rect(obj.x, obj.y, WIDTH_TILE * 0.5, HEIGHT_TILE * SCREEN_RATE* 0.5);
	CONTEXT.fillStyle = 'yellow';
	CONTEXT.fill();
	CONTEXT.strokeStyle = 'blue';
	CONTEXT.stroke();
}

function drawAll()
{
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
	redraw();
}

// Functions on Animation Management
function animate()
{
	hockeyMove();
	drawAll();
	requestAnimFrame(function() { animate(); });
}

// Other Functions
function loadGlobalVariables()
{
	CANVAS = document.getElementById('canvas');
	CONTEXT = CANVAS.getContext('2d');
	SHAPELIST = {};
	SCREEN_RATE = CANVAS.width / CANVAS.height;
	TILENO = 20;
	ACTIVATED = false;
}

function initialize() 
{
	loadGlobalVariables();
	windowtoTiles();

	createRectangle(WIDTH_TILE, HEIGHT_TILE * SCREEN_RATE * TILENO / 2, "player1");
	createRectangle(CANVAS.width - 2 * WIDTH_TILE, HEIGHT_TILE * SCREEN_RATE * TILENO / 2, "player2");
	addHockey(CANVAS.width / 2, HEIGHT_TILE * SCREEN_RATE * TILENO / 2, "hockey");
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
}

// Button Functions
function startButton()
{
	animate();
}

// Classes
function rectangle(x, y)
{
	this.x = x;
	this.y = y;
}

// Class-related Functions
function createRectangle(x, y, name)
{
	var newRectangle = new rectangle(x, y);
	SHAPELIST[name] = newRectangle;
	drawRectangle(newRectangle);
}

function moveRectangle(position)
{
	drawAll();

	// Move only the left one
	SHAPELIST["player1"].y = position.y - HEIGHT_TILE * SCREEN_RATE; 

	checkBorders();
}

function checkBorders()
{
	// Only for the left one
	if(SHAPELIST["player1"].y <= 0)
		SHAPELIST["player1"].y = 0;
	if(SHAPELIST["player1"].y >= CANVAS.height - 2 * HEIGHT_TILE * SCREEN_RATE)
		SHAPELIST["player1"].y = CANVAS.height - 2 * HEIGHT_TILE * SCREEN_RATE;
}

function addHockey(x, y, name)
{
	var square = new rectangle(x, y);
	square.vx = 1; // added 
	square.vy = 1; // added
	SHAPELIST[name] = square;
	drawSquare(square);
	
	console.log("x: ", x);
	console.log("y: ", y);
}

function hockeyMove()
{
	var leftWall = 0 >= SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx;
	var rightWall = SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx >= CANVAS.width;
	var leftPlayerX = SHAPELIST["player1"].x >= SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx;
	var rightPlayerX = SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx >= SHAPELIST["player2"].x;
	// SHAPELIST["player1"].y 	SHAPELIST["player1"].y + HEIGHT_TILE SHAPELIST["hockey"].y SHAPELIST["hockey"].y + HEIGHT_TILE // might need to add end points into class for all objects in SHAPELIST
	var speedMax = 10;
	if(leftWall || rightWall || leftPlayerX || rightPlayerX)
	{
		if(Math.abs(SHAPELIST["hockey"].vx) < speedMax)
			SHAPELIST["hockey"].vx += (SHAPELIST["hockey"].vx > 0 ? 1 : -1);
		SHAPELIST["hockey"].vx *= -1;
	}
	SHAPELIST["hockey"].x += SHAPELIST["hockey"].vx;
}

// Main function
function main()
{
	// Start
	initialize();

	// Animation Window
	window.requestAnimFrame = (function(callback){
		return function(callback) {
		  window.setTimeout(callback, 3);
		};
	  })();

	// Mouse Events
	CANVAS.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(CANVAS, evt);
		moveRectangle(mousePos);
		document.getElementById("canvas").style.cursor = "none";
		//MOUSE_IN = true;
		//animate = setTimeout(hockeyMove(),20);
	  }, false);
}
