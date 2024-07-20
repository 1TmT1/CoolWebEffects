const replayImage = document.querySelector('#replay'); 
const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

// Global variables
const GRAVITY = 1;
const FRICTION = 0.5;
const OFFSET = 5;

addEventListener('resize', () => {
    init();
});

function randomNumFromRange(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function randomColor() {
    return `${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`;
}

class Ball {
    constructor(x, y, dy, radius, color, opacity) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.opacity = opacity;
    }

    update() {
        if(this.y + this.radius + this.dy + OFFSET > canvas.height){
            this.dy = -this.dy * FRICTION;
        } else {
            this.dy += GRAVITY;
        }
        this.y += this.dy;
        if(Math.floor(this.y) + this.radius + OFFSET >= canvas.height && this.dy < 0.1) {
            if(this.opacity > 0) {
                this.opacity -= 0.01;
            }
        }
        this.draw();
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        c.fill();
        c.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
        c.stroke();
    }
}

let balls = [];
const NUM_OF_BALLS = 100;

function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    for(let i = 0; i < NUM_OF_BALLS; i++) {
        const radius = randomNumFromRange(20, 40);
        let x = randomNumFromRange(0, canvas.width);
        let y = randomNumFromRange(0, canvas.height - radius);
        balls.push(new Ball(x, y, 2, radius, randomColor(), Math.random()));
    }
}

function fadeInElement(element) {
    let opacity;
    console.log(element.style.opacity);
    opacity = element.style.opacity;
    opacity += 0.1;
    // element.style.opacity = opacity;
    return opacity;
}

function animate() {
    const animID = requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    let allGone = true;
    for(let i = 0; i < balls.length; i++) {
        balls[i].update();
        if(balls[i].opacity > 0) {
            allGone = false;
        }
    }

    if(allGone) {
        cancelAnimationFrame(animID);
        const replayBall = new Ball(canvas.width / 2, canvas.height / 2, 0, 100, '46, 176, 102', 0.1);
        const fadeInBack = setInterval(() => {
            if(replayBall.opacity >= 1) {
                clearInterval(fadeInBack);
            }
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.shadowColor = 'rgba(0, 0, 0, 0.5)';
            c.shadowBlur = 10;
            c.shadowOffsetY = 10;
            replayBall.draw();
            replayBall.opacity += 0.1;
        }, 30);

        replayImage.style.opacity = window.getComputedStyle(replayImage).getPropertyValue('opacity');
        const fadeIn = setInterval(() => {
            // const opacity = fadeInElement(replayImage);
            // if(replayImage.style.opacity == undefined) {
            // }
            if(replayImage.style.opacity >= 1) {
                clearInterval(fadeIn);
            }
            replayImage.style.opacity = parseFloat(replayImage.style.opacity) + 0.1;
        }, 30);

        addEventListener('mousemove', (e) => {
            const dx = e.clientX - canvas.width / 2; 
            const dy = e.clientY - canvas.height / 2; 
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 100) {
                replayImage.style.cursor = 'pointer';
            } else {
                replayImage.style.cursor = 'auto';
            }
        });

        addEventListener('mousedown', (e) => {
            if(replayImage.style.cursor === 'pointer') {
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.shadowColor = 'rgba(0, 0, 0, 0.5)';
                c.shadowBlur = 5;
                c.shadowOffsetY = 10;
                replayBall.color = '60, 215, 128';
                replayBall.draw();
            }
        });

        addEventListener('mouseup', (e) => {
            if(replayImage.style.cursor === 'pointer') {
                location.reload();
            }

            c.clearRect(0, 0, canvas.width, canvas.height);
            c.shadowColor = 'rgba(0, 0, 0, 0.5)';
            c.shadowBlur = 10;
            c.shadowOffsetY = 10;
            replayBall.color = '46, 176, 102';
            replayBall.draw();
        });
    }
}

init();
animate();