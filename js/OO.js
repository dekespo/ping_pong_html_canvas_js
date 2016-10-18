// Classes
function rectangle(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// Class-related Methods
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
	SHAPELIST.player1.y = position.y - HEIGHT_TILE; 
	SHAPELIST.player1.y = checkBorders(SHAPELIST.player1.y);
}

function checkBorders(y)
{
	if(y <= 0)
		y = 0;
	if(y >= CANVAS.height - PLAYER_HEIGHT)
		y = CANVAS.height - PLAYER_HEIGHT;
	return y;
}

function addHockey(x, y, size, size2, name)
{
	var square = new rectangle(x, y, size, size2);
	var magnitude = CANVAS.width / WIDTH_MAX * 2;
	//console.log("magnitude = ", magnitude);
	var angle = Math.random() * 2 * Math.PI - Math.PI;
	while ( Math.PI / 4 < Math.abs(angle) && Math.abs(angle) < Math.PI * 3 / 4)
		angle = Math.random() * 2 * Math.PI - Math.PI;
	square.vx = magnitude * Math.cos(angle); 
	square.vy = magnitude * Math.sin(angle);
	square.magnitude = magnitude;
	square.angle = angle;
	SHAPELIST[name] = square;
	drawSquare(square);
}

function hockeyMove() 
{
	var hockey = SHAPELIST.hockey; // Warning: it changes the global variable
	var p1 = SHAPELIST.player1; var p2 = SHAPELIST.player2;
	var leftWall = 0 >= hockey.x + hockey.vx;
	var rightWall = hockey.x + hockey.width + hockey.vx >= CANVAS.width;
	var leftPlayerX = p1.x + p1.width >= hockey.x + hockey.vx;
	var leftPlayerY = (hockey.y + hockey.height >= p1.y) && (p1.y + p1.height >= hockey.y);
	var rightPlayerX = hockey.x + hockey.width + hockey.vx >= p2.x;
	var rightPlayerY = (hockey.y + hockey.height >= p2.y) && (p2.y + p2.height >= hockey.y);
	var leftPlayerTopXLeft = (p1.x <= hockey.x) && (hockey.x <= p1.x + p1.width);
	var leftPlayerTopXRight = (p1.x <= hockey.x + hockey.width) && (hockey.x + hockey.width <= p1.x + p1.width);
	var leftPlayerTopY = (hockey.y < p1.y && p1.y) < (hockey.y + hockey.height);
	var leftPlayerBottomY = (hockey.y < p1.y + p1.height) && (p1.y + p1.height < hockey.y + hockey.height);

	var speedMax = 10;
	var pixelAdd = CANVAS.width / WIDTH_MAX;
	if ( (leftPlayerX && leftPlayerY) || (rightPlayerX && rightPlayerY) )
	{
		if(Math.abs(hockey.vx) < speedMax)
			hockey.vx += (hockey.vx > 0 ? pixelAdd : -pixelAdd);
		hockey.vx *= -1;
	}

	if ( (leftPlayerTopXLeft || leftPlayerTopXRight) )
		if (leftPlayerTopY && hockey.vy > 0)
		{
			//console.log("Edge hit TOP! ");
			hockey.vy *= -1;
		}
		else if ( leftPlayerBottomY && hockey.vy < 0)
		{
			//console.log("Edge hit BOTTOM! ");
			hockey.vy *= -1;
		}

	//pixelAdd = CANVAS.height / HEIGHT_MAX; // maybe needed later
	if (leftPlayerX && leftPlayerY)
	{
		if(Math.abs(hockey.vy) < speedMax)
			hockey.vy += calculateYdirection(p1, hockey);
	}
	else if(rightPlayerX && rightPlayerY)
	{
		if(Math.abs(hockey.vy) < speedMax)
			hockey.vy += calculateYdirection(p2, hockey);
	}

	if(leftWall || rightWall)
	{
		ACTIVATED = false;
		GAME_OVER = true;
		document.getElementById("canvas").style.cursor = "pointer";
		if(leftWall) 
			WINNER = false;
		else
			WINNER = true;
		showResult(WINNER); 
	}

	var topWall = 0 >= hockey.y + hockey.vy;
	var bottomWall = hockey.y + hockey.height + hockey.vy >= CANVAS.height;
	if(topWall || bottomWall)
	{
		hockey.vy *= -1;
	}

	hockey.x += hockey.vx;
	hockey.y += hockey.vy;

}

var calculateYdirection = function(player, hockey)
{
	var midPlayerY = player.y + player.height / 2;
	var midHockeY = hockey.y + hockey.height / 2;
	var yDiff = midHockeY - midPlayerY;
	return yDiff / player.height;
};
