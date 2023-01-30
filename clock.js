// VARIABLES 
var canvas = document.getElementById("canvas");
var clk = canvas.getContext("2d");
var radius = canvas.height / 2;
clk.translate(radius, radius);
radius = radius * 0.9
setInterval(drawClock, 1000);

// DRAW CLOCK 
function drawClock() {
    drawFace(clk, radius);
    drawNumbers(clk, radius);
    drawTime(clk, radius);
}

// DRAW FACE 
function drawFace(clk, radius) {
    var grad;
    clk.beginPath();
    clk.arc(0, 0, radius, 0, 2 * Math.PI);
    clk.fillStyle = 'white';
    clk.fill();
    grad = clk.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    clk.strokeStyle = grad;
    clk.lineWidth = radius * 0.1;
    clk.stroke();
    clk.beginPath();
    clk.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    clk.fillStyle = '#333';
    clk.fill();
}

// DRAW NUMBERS 
function drawNumbers(clk, radius) {
    var ang;
    var num;
    clk.font = radius * 0.15 + "px arial";
    clk.textBaseline = "middle";
    clk.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        clk.rotate(ang);
        clk.translate(0, -radius * 0.85);
        clk.rotate(-ang);
        clk.fillText(num.toString(), 0, 0);
        clk.rotate(ang);
        clk.translate(0, radius * 0.85);
        clk.rotate(-ang);
    }
}

// DRAW TIME 
function drawTime(clk, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(clk, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(clk, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(clk, second, radius * 0.9, radius * 0.02);
}

// DRAW HAND 
function drawHand(clk, pos, length, width) {
    clk.beginPath();
    clk.lineWidth = width;
    clk.lineCap = "round";
    clk.moveTo(0, 0);
    clk.rotate(pos);
    clk.lineTo(0, -length);
    clk.stroke();
    clk.rotate(-pos);
}