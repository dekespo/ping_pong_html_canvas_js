// Functions on Drawing Management
function redraw() 
{
	CONTEXT.strokeStyle = 'blue';
	CONTEXT.lineWidth = '5';
	CONTEXT.strokeRect(0, 0, CANVAS.width, CANVAS.height);
	SHAPELIST.player1.width = PLAYER_WIDTH; 
	SHAPELIST.player1.height = PLAYER_HEIGHT;
	SHAPELIST.player2.width = PLAYER_WIDTH;
	SHAPELIST.player2.height = PLAYER_HEIGHT;
	SHAPELIST.hockey.width = HOCKEY_WIDTH;
	SHAPELIST.hockey.height = HOCKEY_HEIGHT;
	drawRectangle(SHAPELIST.player1);
	drawRectangle(SHAPELIST.player2);
	drawSquare(SHAPELIST.hockey);
	if(GAME_OVER)
		showResult(WINNER);
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
