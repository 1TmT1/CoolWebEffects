const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function randomNumberFromRange(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum + 1) + minimum);
}

function randomColor() {
    return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;    
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText("Hello World!-)", mouse.x, mouse.y);
}

init();