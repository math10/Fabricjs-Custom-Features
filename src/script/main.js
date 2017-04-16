function myFunction() {
	var circle = new fabric.Circle({
			radius : 20,
			fill : 'green',
			left : 100,
			top : 100
		});
	this.__canvas.add(circle);
}

function deleteObject() {
	var object = canvas.getActiveObject();
	if (object) {
		saveState(object, false, true);
		object.remove();
	}
}
//(function() {
var canvas = this.__canvas = new fabric.Canvas('a');
document.onkeydown = KeyPress;
var scope = this;
function KeyPress(e) {
	var evtobj = window.event ? event : e;
	if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
		undo();
	}
}
var current;
var list = [];
var state = [];

canvas.on("object:added", function (e) {
	var object = e.target;
	console.log('object:added');
	if (object !== current)
		saveState(object, true, false);
});

canvas.on("object:modified", function (e) {
	var object = e.target;
	console.log('object:modified');
	saveState(object, false, false);
});

function saveState(object, isAdded, isRemoved) {
	state.push(JSON.stringify({
			object : JSON.stringify(object.originalState),
			isAdded : isAdded,
			isRemoved : isRemoved
		}));
	object.saveState();
	list.push(object);
}

function undo() {

	if (state.length === 0) {
		return;
	}

	console.log('undo');

	current = list.pop();
	var objectState = JSON.parse(state.pop());
	if (objectState.isAdded) {
		current.remove();
	} else if (objectState.isRemoved) {
		canvas.add(current);
	} else
		current.setOptions(JSON.parse(objectState.object));
	current.setCoords();
	canvas.renderAll();
}

//})();
