let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('resize', () => {
    init();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let [minRadiusFactor, maxRadiusFactor] = [7, 10];

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = Math.random() * minRadiusFactor + 1;
        this.maxRadius = Math.random() * maxRadiusFactor + radius;
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if(this.radius < this.maxRadius && mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            this.radius += 1
        } else if(this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw();
    }
}

let circles = [];

function init() {
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    for(let i = 0; i < 700; i++) {
        let radius = Math.random() * 40 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 0.7;
        let dy = (Math.random() - 0.5) * 0.7;
        circles.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

init();
animate();