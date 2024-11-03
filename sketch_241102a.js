let box, obstacles, score;
var GameSpeed = 5;
var BoxSize = 30;
var ObstacleInterval = 1000;

function setup() {
    createCanvas(400, 600);
    box = { x: width / 2 - 15, y: height - 30, speed: GameSpeed, size: BoxSize };
    obstacles = [];
    score = 0;
    setInterval(createObstacle, ObstacleInterval);
}

function draw() {
    background(137,222,214);
    updateBox();
    updateObstacles();
    checkCollisions();
    displayScore();
}

function updateBox() {
    box.y -= box.speed;
    if (box.y < 0) {
        box.y = height - box.size;
        score++;  // Increment score on each screen completion
    }
    fill(243,242,16);
    rect(box.x, box.y, box.size, box.size);
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];
        obstacle.y += 2;
        if (obstacle.y > height) {
            obstacles.splice(i, 1);
        } else {
            fill(255,0,0);
            rect(obstacle.x, obstacle.y, 40, 20);
        }
    }
}

function checkCollisions() {
    for (let obstacle of obstacles) {
        if (box.x < obstacle.x + 40 && box.x + box.size > obstacle.x &&
            box.y < obstacle.y + 20 && box.y + box.size > obstacle.y) {
            noLoop();
            textSize(32);
            fill(255,0,0);
            text(`Game Over!`, 50, height / 2);
            fill(0);
            text(`Score:`, 235, height / 2);
            fill(0,0,255);
            text(`${score}`, 335, height / 2);
        }
    }
}

function createObstacle() {
    let x = random(width - 40);
    obstacles.push({ x, y: 0 });
}


function displayScore() {
    fill(0);
    textSize(25);
    text(`Score:`, 150, 20);
    
    fill(0,0,255);
    textSize(25);
    text(`${score}`, 230, 20);
}

function keyPressed() {
    if ((keyCode === LEFT_ARROW || key === 'a') && box.x > 0) box.x -= 20;
    if ((keyCode === RIGHT_ARROW || key === 'd') && box.x < width - box.size) box.x += 20;
}
