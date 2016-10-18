// Other Functions
function loadGlobalVariables(firstTime)
{
	CANVAS = document.getElementById('canvas');
	CONTEXT = CANVAS.getContext('2d');
	SHAPELIST = {};
	TILENO = 20; 
	WINDOW_RATIO = 2; // width (2) : height (1)
	if(firstTime)
	{
		OBJ_HEIGHT_WIDTH_RATIO = 2.5;
		AI_LEVEL = "artista";
	}
	WIDTH_MAX = 1000; HEIGHT_MAX = WIDTH_MAX / WINDOW_RATIO; 
	ACTIVATED = false;
	GAME_OVER = false;
	WINNER = null;
	AI_TARGET_Y = null;
}

function initialize(firstTime) 
{
	loadGlobalVariables(firstTime);
	windowtoTiles();

	createRectangle(PLAYER1_POS.x, PLAYER2_POS.y, PLAYER_WIDTH, PLAYER_HEIGHT, "player1");
	createRectangle(PLAYER2_POS.x, PLAYER2_POS.y, PLAYER_WIDTH, PLAYER_HEIGHT, "player2");
	addHockey(HOCKEY_POS.x, HOCKEY_POS.y, HOCKEY_WIDTH, HOCKEY_HEIGHT, "hockey");
	resizeCanvas();
	//window.addEventListener('resize', resizeCanvas, false);
	document.getElementById('canvasResize').addEventListener('resize', resizeCanvas, false);
}
