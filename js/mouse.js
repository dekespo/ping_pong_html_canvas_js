// Functions on Mouse Management
function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
		y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
	};
}

// Mouse Event Functions
function start()
{
	ACTIVATED = true;
	document.getElementById("canvas").style.cursor = "none";
	animate();
}

function stop()
{
	ACTIVATED = false;
	document.getElementById("canvas").style.cursor = "pointer";
}
