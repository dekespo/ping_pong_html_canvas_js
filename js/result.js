function showResult(res)
{
	var contextSize = Math.floor(CANVAS.width / 20); // check this 
	CONTEXT.font = (contextSize).toString() + "px Arial";
	CONTEXT.fillStyle = "black";
	if(res)
	{
		console.log("win");
		CONTEXT.fillText("YOU WIN!", CANVAS.width / 3, CANVAS.height / 3);
	}
	else
	{
		console.log("lose");
		CONTEXT.fillText("YOU LOSE!", CANVAS.width / 3, CANVAS.height / 3);
	}
	CONTEXT.fillText("Click here to play again.", CANVAS.width / 3, CANVAS.height * 2 / 3);
}
