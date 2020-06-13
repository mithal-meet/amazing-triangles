var canvas=document.getElementById('box');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

var startCOD = {};
var endCOD = {};

const colors = ['red', 'green', 'blue', 'yellow', 'black'];
let currentColor = 0;

let triangles = [];

let isDragging = false;
let triangleBeingDragged = null;
let triangleDragStartCOD = {};

function sign ( p1,  p2,  p3)
{
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function PointInTriangle ( pt,  v1,  v2,  v3)
{
    var d1, d2, d3;
    var has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

function isTrianglePresent(startCOD) {
    triangles.forEach((triangle, index) => {
        if (PointInTriangle(startCOD, triangle.startCOD, triangle.leftCOD, triangle.rightCOD)) {
            isDragging = true;
            triangleBeingDragged = index;
            triangleDragStartCOD = startCOD;
            return false;
        }
    })   
}



canvas.addEventListener('mousedown', (params) => {
    startCOD.x = params.offsetX;
    startCOD.y = params.offsetY;

    isTrianglePresent(startCOD);
    // console.log(triangles);
})

function updateDrawing(dragStartCOD, dragEndCOD) {
    const diffX = dragEndCOD.x - dragStartCOD.x;
    const diffY = dragEndCOD.y - dragStartCOD.y;

    const triangleFound = triangles[triangleBeingDragged];
    const {startCOD, leftCOD, rightCOD, color } = triangleFound;

    triangles[triangleBeingDragged] = {
        startCOD: {x: startCOD.x + diffX, y: startCOD.y + diffY },
        leftCOD: {x: leftCOD.x + diffX, y: leftCOD.y + diffY },
        rightCOD: {x: rightCOD.x + diffX, y: rightCOD.y + diffY },
        color
    }
}


canvas.addEventListener('mouseup', (params) => {
    endCOD.x = params.offsetX;
    endCOD.y = params.offsetY;

    if (!isDragging) {
        drawNewTriangle();
    } else {
        // updateDrawing(triangleDragStartCOD, endCOD);
        isDragging = false;
    }

    // console.log(triangles)
})

document.addEventListener('mousemove', (params) => {
    const currentCOD = {};
    currentCOD.x = params.offsetX;
    currentCOD.y = params.offsetY;
    
    if (isDragging) {
        currentTriangleCOD = triangles[triangleBeingDragged].startCOD;
        if (isDragging) {
            updateDrawing(currentTriangleCOD, currentCOD);
        }
    }
})

function drawNewTriangle() {

    const leftCOD = { x: startCOD.x - (endCOD.x - startCOD.x), y: endCOD.y};
    const rightCOD = {x: endCOD.x, y : endCOD.y };

    const currentTriangle = {
        startCOD,
        leftCOD,
        rightCOD,
        color: colors[currentColor]
    };

    triangles.push(currentTriangle);
    currentColor = (currentColor + 1) % colors.length;

    startCOD = {};
}


function drawOnCanvas(data) {
    const { startCOD, leftCOD, rightCOD, color } = data;
    context.beginPath();
    context.moveTo(startCOD.x, startCOD.y);
    context.lineTo(leftCOD.x, leftCOD.y);
    context.lineTo(rightCOD.x, rightCOD.y);
    context.fillStyle = color;
    context.fill();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function resetCanvas() {
    triangles = [];
}


function animate() {
    clearCanvas();
    triangles.forEach(triangle => {
        drawOnCanvas(triangle)
    })
    requestAnimationFrame(animate);
}

animate();