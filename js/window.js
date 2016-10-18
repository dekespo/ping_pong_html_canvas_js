// Functions on Window Size Management
function windowtoTiles()
{
	WIDTH_TILE = CANVAS.width / TILENO;
	HEIGHT_TILE = CANVAS.height / TILENO;
	PLAYER_HEIGHT = HEIGHT_TILE * WINDOW_RATIO * OBJ_HEIGHT_WIDTH_RATIO;
	PLAYER_WIDTH = WIDTH_TILE / OBJ_HEIGHT_WIDTH_RATIO;
	HOCKEY_HEIGHT = HEIGHT_TILE * WINDOW_RATIO / OBJ_HEIGHT_WIDTH_RATIO;
	HOCKEY_WIDTH = WIDTH_TILE / OBJ_HEIGHT_WIDTH_RATIO;
	PLAYER1_POS = {"x": WIDTH_TILE, "y": HEIGHT_TILE * TILENO / 2 - PLAYER_HEIGHT / 2 };
	PLAYER2_POS = {"x": CANVAS.width - WIDTH_TILE - PLAYER_WIDTH, "y": HEIGHT_TILE * TILENO / 2 - PLAYER_HEIGHT / 2 };
	HOCKEY_POS = {"x":CANVAS.width / 2 - HOCKEY_WIDTH / 2, "y": CANVAS.height / 2 - HOCKEY_HEIGHT / 2};
}

function transformSize(coor, prevSizes)
{
	coor.x *= CANVAS.width / prevSizes.width;
	coor.y *= CANVAS.height / prevSizes.height;
	try
	{
		coor.magnitude *= CANVAS.width / prevSizes.width;
		coor.angle = Math.atan2(coor.vy, coor.vx);
		coor.vx = coor.magnitude * Math.cos(coor.angle); 
		coor.vy = coor.magnitude * Math.sin(coor.angle);
	}
	catch(err)
	{ 
		console.log("error catched!");
	}
	return coor;
}

function resizeCanvas() 
{
	var prevSizes = {};
	prevSizes.width = CANVAS.width;
	prevSizes.height = CANVAS.height;

	var parentDiv = document.getElementById('canvasResize');
	var constant = 0.8;
	CANVAS.width = Math.min(parentDiv.clientWidth * constant, WIDTH_MAX);
	CANVAS.height = Math.min(parentDiv.clientHeight * constant, HEIGHT_MAX);

	var ratio = CANVAS.width / CANVAS.height;
	if (ratio != WINDOW_RATIO)
	{
		if (CANVAS.width < WIDTH_MAX)
			CANVAS.height = CANVAS.width / WINDOW_RATIO;
		else
			CANVAS.height = HEIGHT_MAX;
	}
	windowtoTiles();
	SHAPELIST.player1 = transformSize(SHAPELIST.player1, prevSizes);
	SHAPELIST.player2 = transformSize(SHAPELIST.player2, prevSizes);
	SHAPELIST.hockey = transformSize(SHAPELIST.hockey, prevSizes);
	redraw();
}
