window.onload = function()
{
	var canvasWindow = document.querySelector("#canvasResize");

	canvasWindow.className = canvasWindow.className + ' resizable';
	var resizer = document.createElement('div');
	resizer.className = 'resizer';
	canvasWindow.appendChild(resizer);
	resizer.addEventListener('mousedown', initDrag, false);

	var startX, startY, startWidth, startHeight;

	function initDrag(e) 
	{
		startX = e.clientX;
		startWidth = parseInt(document.defaultView.getComputedStyle(canvasWindow).width, 10);
		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);
	}

	function doDrag(e) 
	{
		var newSize = (startWidth + e.clientX - startX);
		if(newSize > WIDTH_MAX)
			newSize = WIDTH_MAX;
		canvasWindow.style.width = newSize + 'px';
		resizeCanvas();
	}

	function stopDrag(e) 
	{
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
	}
};
