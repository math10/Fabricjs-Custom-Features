function handleDragStart(e) {
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
    this.classList.add('img_dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('#images img.img_dragging');


    console.log('event: ', e, img.id);

    switch(img.id){
        case 'circle':
            addCircle(e);
            break;
        case 'rect':
            addRect(e);
            break;
        case 'triangle':
            addTriangle(e);
            break;
    }

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
    });
}

function addCircle(e) {
    var circle = new fabric.Circle({
        radius: 20,
        fill: 'green',
        left: e.layerX,
        top: e.layerY
    });
    canvas.add(circle);
}

function addRect(e) {
    // create a rectangle object
    var rect = new fabric.Rect({
        left: e.layerX,
        top: e.layerY,
        fill: 'red',
        width: 20,
        height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
}

function addTriangle(e) {
    var triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: 'blue',
        left: e.layerX,
        top: e.layerY
    });

    canvas.add(triangle);
}


// Browser supports HTML5 DnD.

// Bind the event listeners for the image elements
var images = document.querySelectorAll('#images img');
[].forEach.call(images, function (img) {
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
});
// Bind the event listeners for the canvas
var canvasContainer = document.getElementById('canvas-container');
canvasContainer.addEventListener('dragenter', handleDragEnter, false);
canvasContainer.addEventListener('dragover', handleDragOver, false);
canvasContainer.addEventListener('dragleave', handleDragLeave, false);
canvasContainer.addEventListener('drop', handleDrop, false);