function scrollBottom() {
    window.scrollTo(0, document.body.scrollHeight);

}

function scrollPage(delta) {
    elScroll.scrollBy({
        top: 500 * delta,
        behavior: "auto"
    });
}

window.onload = scrollBottom;

const elScroll = document.documentElement;

elScroll.addEventListener("wheel", (evt) => {

  evt.preventDefault();
  const delta = Math.sign(-evt.deltaY);
  
  scrollPage(delta);
  
}, { passive: false });



// Draggable scroll image
const scrollImage = document.querySelector("#scroll-image");

let drag;
let startYPage;
let moveY;

let mousePostion = {
    x: 0,
    y: 0
};

function update() {
    if (drag) {
        requestAnimationFrame(update);
    }
    scrollImage.style.bottom = `${(startY + (moveY - startYPage) * -1)}px`;
}

scrollImage.addEventListener("mousedown", (e) => { 
    drag = scrollImage;
    startYPage = e.pageY;
    startY = parseInt(scrollImage.style.bottom.replace(/\D/g, "")) || 0;
    requestAnimationFrame(update);
});

document.addEventListener("mouseup", (e) => {
    drag = null;
    startY = scrollImage.style.bottom;
    document.body.style.cursor = "default";
    // if (e.target !== document.body) {
    //     e.target.style.cursor = "inherit";
    // }
});

document.onmousemove = function(e) {
    if (drag) {
        document.body.style.cursor = "grabbing";
        if (e.target !== document.body) {
            e.target.style.cursor = "inherit";
        }
        moveY = e.pageY;
    }

    mousePostion.x = e.pageY;
    mousePostion.y = e.pageX;
}


// Magnet Effect

const lerp = (current, target, factor) => {
    return current * (1 - factor) + target * factor;
};

const calculateDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
}

class MagneticObject {
    constructor(documentElement) {
        this.documentElement = documentElement;
        this.boundingClientReact = this.documentElement.getBoundingClientReact();
        this.triggerArea = 100;
        this.interpolationFactor = 0.8;
        this.lerpingData = {
            x: {
                current: 0, 
                target: 0
            },
            y: {
                current: 0,
                target: 0
            }
        };

        this.resize();
        this.render();
    }

    resize() {
        window.addEventListener("resize", (e) => {
            this.boundingClientReact = this.documentElement.getBoundingClientReact();
        });
    }

    render() {
        // const distanceMouseToCenter
        window.requestAnimationFrame(() => this.render());
    }
}

new MagneticObject(scrollImage);
