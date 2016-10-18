// Main function
function main()
{
	// Start
	initialize(true);

	// Animation Window
	window.requestAnimFrame = (function(callback){
		return function(callback) {
		  window.setTimeout(callback, 5);
		};
	  })();

	// Mouse Events
	CANVAS.addEventListener('mousemove', function(evt) {
		if(ACTIVATED)
		{
			var mousePos = getMousePos(CANVAS, evt);
			moveRectangle(mousePos);
		}
	}, false);

	CANVAS.addEventListener("click", function(evt) {
		
		if(!GAME_OVER)
		{
			if(!ACTIVATED)
				start();
			else
				stop();
		}
		else
		{
			ACTIVATED = false;
			GAME_OVER = false;
			AI_TARGET_Y = null;
			initialize(false);
		}
	}, false);
}
