// Functions on Animation Management
function animate()
{
	hockeyMove();
	//SHAPELIST["player1"] = artificialIntelligence(SHAPELIST["player1"]);
	SHAPELIST.player2 = artificialIntelligence(SHAPELIST.player2, AI_LEVEL);
	if(ACTIVATED)
	{
		drawAll();
		requestAnimFrame(function() { animate(); });
	}
}
