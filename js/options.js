function selectOptionLevel()
{
	var e = document.getElementById("selectLevel");
	AI_LEVEL = e.options[e.selectedIndex].value;
	console.log("Level changed!");
	console.log(AI_LEVEL);
	ACTIVATED = false;
	GAME_OVER = false;
	AI_TARGET_Y = null;
	initialize(false);
}

function selectOptionSize()
{
	var e = document.getElementById("selectSize");
	var strSize = e.options[e.selectedIndex].value;
	OBJ_HEIGHT_WIDTH_RATIO = Number(strSize);
	console.log("Size changed!");
	console.log(OBJ_HEIGHT_WIDTH_RATIO);

	ACTIVATED = false;
	GAME_OVER = false;
	AI_TARGET_Y = null;
	initialize(false);
}
