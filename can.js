var canvas=document.getElementById('box');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var startCOD = {};
var endCOD = {};

const colors = ['red', 'green', 'blue', 'yellow', 'black'];
let currentColor = 0;

document.addEventListener('mousedown', (params) => {
    startCOD.x = params.offsetX;
    startCOD.y = params.offsetY;
})

document.addEventListener('mouseup', (params) => {
    endCOD.x = params.offsetX;
    endCOD.y = params.offsetY;

    currentColor = (currentColor + 1) % colors.length;
    draw();
})

function draw() {

    const leftCOD = { x: startCOD.x - (endCOD.x - startCOD.x), y: endCOD.y};
    const rightCOD = {x: endCOD.x, y : endCOD.y }
    
    
    context.beginPath();
    context.moveTo(startCOD.x, startCOD.y);
    context.lineTo(leftCOD.x, leftCOD.y);
    context.lineTo(rightCOD.x, rightCOD.y);
    context.fillStyle = colors[currentColor];
    context.fill();
    

}
 function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

}
