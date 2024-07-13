let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

// Global variables
let gravity = 1;
let friction = 0.5;

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('resize', () => {
    init();
});

function randomNumFromRange(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function randomColor() {
    return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
}

class Ball {
    constructor(x, y, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    update() {
        if(this.y + this.radius + this.dy> canvas.height){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.draw();
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

let balls = [];
let numOfBalls = 50;

function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let radius = 30;
    for(let i = 0; i < numOfBalls; i++) {
        let x = randomNumFromRange(0, canvas.width);
        let y = randomNumFromRange(0, canvas.height - radius);
        balls.push(new Ball(x, y, 2, randomNumFromRange(20, 40), `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`));
    }
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < numOfBalls; i++) {
        balls[i].update();
    }
}

init();
animate();