// AI function
function artificialIntelligence(player, difficulty) 
{
	//console.log("AI_TARGET_Y", AI_TARGET_Y);
	if (AI_TARGET_Y === null)
		AI_TARGET_Y = player.y;

	if(difficulty == "easy")
		return easy(player);
	else if(difficulty == "artista")
		return medium(player);
	else if(difficulty == "medium")
		return medium(player);
	else if(difficulty == "hard")
		return hard(player);
	else if(difficulty == "immortal")
		return immortal(player);
}

var move = function(yFrom, yTo, speedMax)
{
	var diff = yTo - yFrom;
	var newY = yFrom;
	if (Math.abs(diff) > speedMax)
	{
		if (diff > 0)
			newY += speedMax;
		else if (diff < 0)
			newY -= speedMax;
	}
	else
	{
		newY = yTo;
	}
	return checkBorders(newY);
};

var setTarget = function(y, dist)
{
	AI_TARGET_Y = checkBorders(y + dist);
};

var easy = function(player)
{
	if (player.y == AI_TARGET_Y)
	{
		if (Math.random() < 0.5)
			setTarget(player.y, -player.height / 2);
		else
			setTarget(player.y, player.height / 2);
		player.y = move(player.y, AI_TARGET_Y, 1);
	}
	else
	{
		player.y = move(player.y, AI_TARGET_Y, 1);
	}
	return player;
};

var medium = function(player)
{
	var hockeyY = SHAPELIST.hockey.y;
	var hockeyVx = SHAPELIST.hockey.vx;
	if (player.y == AI_TARGET_Y)
	{
		if (Math.random() < 0.8)
		{
			//console.log("normal");
			setTarget(player.y, hockeyY - player.y - player.width / 2);
		}
		else
		{
			//console.log("easy");
			player = easy(player);
		}
	}
	else
	{
		player.y = move(player.y, AI_TARGET_Y, Math.min(hockeyVx, 3));
	}
	console.log("medium y = ", player.y);
	return player;
};

var hard = function(player)
{
	var hockeyVx = SHAPELIST.hockey.vx;
	newY = SHAPELIST.hockey.y;
	if (Math.random() < 0.5)
		newY -= player.width;
	else
		newY += player.width;
	diff = newY - player.y;
	if (Math.abs(diff) > player.width / 2)
	{
		if (diff > 0)
			newY = player.y + player.width / 2;
		else if (diff < 0)
			newY = player.y - player.width / 2;
	}
	player.y = move(player.y, newY, Math.min(hockeyVx, 5));
	//player.y = checkBorders(newY);
	return player;
};

var immortal = function(player)
{
	player.y = SHAPELIST.hockey.y - player.height / 2;
	player.y = checkBorders(player.y);
	return player;
};
