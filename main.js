const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;
let isRightPressed = false;
let isLeftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];

// Utilities
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

for(var column=0; column<brickColumnCount; column++) {
    bricks[column] = [];
    for(var row=0; row<brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0 };
    }
}

let brickX = (column*(brickWidth+brickPadding))+brickOffsetLeft;
let brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;

function drawBricks() {
    for(var column=0; column<brickColumnCount; column++) {
        for(var row=0; row<brickRowCount; row++) {
            var brickX = (column*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Movement, Boundary, & Game-Over Handling
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(isRightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(isLeftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        isRightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        isLeftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        isRightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        isLeftPressed = false;
    }
}


const interval = setInterval(draw, 10);

