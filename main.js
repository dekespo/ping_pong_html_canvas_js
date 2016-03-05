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
	WIDTH_TILE = CANVAS.width / TILENO;
	HEIGHT_TILE = CANVAS.height / TILENO;
}

function transformSize(coor, prevSizes)
{
	coor.x *= CANVAS.width / prevSizes.width;
	coor.y *= CANVAS.height / prevSizes.height;
	return coor;
}

function resizeCanvas() 
{
	var prevSizes = {};
	prevSizes["width"] = CANVAS.width;
	prevSizes["height"] = CANVAS.height;
	CANVAS.width = window.innerWidth;
	if(CANVAS.width > WIDTH_MAX) CANVAS.width = WIDTH_MAX;
	CANVAS.height = window.innerHeight;
	if(CANVAS.height > HEIGHT_MAX) CANVAS.height = HEIGHT_MAX;
	windowtoTiles();
	SHAPELIST["player1"] = transformSize(SHAPELIST["player1"], prevSizes);
	SHAPELIST["player2"] = transformSize(SHAPELIST["player2"], prevSizes);
	SHAPELIST["hockey"] = transformSize(SHAPELIST["hockey"], prevSizes);
	redraw();
}

// Functions on Drawing Management
function redraw() 
{
	CONTEXT.strokeStyle = 'blue';
	CONTEXT.lineWidth = '5';
	CONTEXT.strokeRect(0, 0, CANVAS.width, CANVAS.height);
	SHAPELIST["player1"].width = WIDTH_TILE * 0.5; // 4 and 0.5 happen due to different sizes in canvas and try to make a square tile
	SHAPELIST["player1"].height = 4 * HEIGHT_TILE;
	SHAPELIST["player2"].width = WIDTH_TILE * 0.5;
	SHAPELIST["player2"].height = 4 * HEIGHT_TILE;
	SHAPELIST["hockey"].width = WIDTH_TILE * 0.5;
	SHAPELIST["hockey"].height = HEIGHT_TILE;
	drawRectangle(SHAPELIST["player1"]);
	drawRectangle(SHAPELIST["player2"]);
	drawSquare(SHAPELIST["hockey"]);
}

function drawRectangle(obj)
{
	CONTEXT.beginPath();
	CONTEXT.rect(obj.x, obj.y, obj.width, obj.height);
	CONTEXT.fillStyle = 'black';
	CONTEXT.fill();
	CONTEXT.strokeStyle = 'red';
	CONTEXT.stroke();
}

function drawSquare(obj)
{
	CONTEXT.beginPath();
	CONTEXT.rect(obj.x, obj.y, obj.width, obj.height);
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
	//SHAPELIST["player1"] = artificialIntelligence(SHAPELIST["player1"]);
	SHAPELIST["player2"] = artificialIntelligence(SHAPELIST["player2"]);
	drawAll();
	if(ACTIVATED)
		requestAnimFrame(function() { animate(); });
}

// Other Functions
function loadGlobalVariables()
{
	CANVAS = document.getElementById('canvas');
	PREV_CANVAS_SIZE = {"width": CANVAS.width, "height": CANVAS.height};
	CONTEXT = CANVAS.getContext('2d');
	SHAPELIST = {};
	TILENO = 20; // y-axis (check this)
	WIDTH_MAX = 1000; HEIGHT_MAX = 500; 
	//CANVAS.width = WIDTH_MAX; CANVAS.height = HEIGHT_MAX; // default
}

function initialize() 
{
	loadGlobalVariables();
	windowtoTiles();

	createRectangle(WIDTH_TILE, HEIGHT_TILE * TILENO / 2, WIDTH_TILE * 0.5, 4 * HEIGHT_TILE, "player1");
	createRectangle(CANVAS.width - 2 * WIDTH_TILE, HEIGHT_TILE * TILENO / 2, WIDTH_TILE * 0.5, 4 * HEIGHT_TILE, "player2");
	addHockey(WIDTH_TILE * TILENO / 2, HEIGHT_TILE * TILENO / 2, WIDTH_TILE * 0.5, HEIGHT_TILE, "hockey");
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
}

// Button Functions
function startButton()
{
	ACTIVATED = true;
	animate();
}

function stopButton()
{
	ACTIVATED = false;
}

// Classes
function rectangle(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// Class-related Functions
function createRectangle(x, y, width, height, name)
{
	var newRectangle = new rectangle(x, y, width, height);
	SHAPELIST[name] = newRectangle;
	drawRectangle(newRectangle);
}

function moveRectangle(position)
{
	drawAll();

	// Move only the left one
	SHAPELIST["player1"].y = position.y - HEIGHT_TILE; 

	SHAPELIST["player1"] = checkBorders(SHAPELIST["player1"]);
}

function checkBorders(player)
{
	if(player.y <= 0)
		player.y = 0;
	if(player.y >= CANVAS.height - 4 * HEIGHT_TILE)
		player.y = CANVAS.height - 4 * HEIGHT_TILE;
	return player;
}

function addHockey(x, y, size, size2, name) // check this
{
	var square = new rectangle(x, y, size, size2);
	square.vx = 1; square.vy = 1;
	SHAPELIST[name] = square;
	drawSquare(square);
}

function hockeyMove()
{
	var leftWall = 0 >= SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx;
	var rightWall = SHAPELIST["hockey"].x + SHAPELIST["hockey"].width + SHAPELIST["hockey"].vx >= CANVAS.width;
	var leftPlayerX = SHAPELIST["player1"].x + SHAPELIST["player1"].width >= SHAPELIST["hockey"].x + SHAPELIST["hockey"].vx;
	var leftPlayerY = !(SHAPELIST["hockey"].y + SHAPELIST["hockey"].height < SHAPELIST["player1"].y) && 
					  !(SHAPELIST["player1"].y + SHAPELIST["player1"].height < SHAPELIST["hockey"].y);
	var rightPlayerX = SHAPELIST["hockey"].x + SHAPELIST["hockey"].width + SHAPELIST["hockey"].vx >= SHAPELIST["player2"].x;
	var rightPlayerY = !(SHAPELIST["hockey"].y + SHAPELIST["hockey"].height < SHAPELIST["player2"].y) && 
					  !(SHAPELIST["player2"].y + SHAPELIST["player2"].height < SHAPELIST["hockey"].y);
	var speedMax = 10;
	var pixelAdd = CANVAS.width / WIDTH_MAX;
	if((leftPlayerX && leftPlayerY) || (rightPlayerX && rightPlayerY) )
	{
		if(Math.abs(SHAPELIST["hockey"].vx) < speedMax)
			SHAPELIST["hockey"].vx += (SHAPELIST["hockey"].vx > 0 ? pixelAdd : -pixelAdd);
		SHAPELIST["hockey"].vx *= -1;
	}

	if(leftWall || rightWall)
	{
		ACTIVATED = false;
		if(leftWall) 
		{
			if(confirm("You Lose! Again?"))
				initialize();
		}
		else
		{
			if(confirm("You Win! Again?")); // this will never happen with that AI
				initialize();
		}
	}


	var topWall = 0 >= SHAPELIST["hockey"].y + SHAPELIST["hockey"].vy;
	var bottomWall = SHAPELIST["hockey"].y + SHAPELIST["hockey"].height + SHAPELIST["hockey"].vy >= CANVAS.height;
	if(topWall || bottomWall)
	{
		SHAPELIST["hockey"].vy *= -1;
	}

	SHAPELIST["hockey"].x += SHAPELIST["hockey"].vx;
	SHAPELIST["hockey"].y += SHAPELIST["hockey"].vy;
}

// AI function
function artificialIntelligence(player) // Immortal
{
	player.y = SHAPELIST["hockey"].y - player.width / 2;
	player = checkBorders(player);
	return player;
}

// Main function
function main()
{
	// Start
	ACTIVATED = false;
	initialize();

	// Animation Window
	window.requestAnimFrame = (function(callback){
		return function(callback) {
		  window.setTimeout(callback, 5);
		};
	  })();

	// Mouse Events
	CANVAS.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(CANVAS, evt);
		moveRectangle(mousePos);
		document.getElementById("canvas").style.cursor = "none";
	  }, false);
}
