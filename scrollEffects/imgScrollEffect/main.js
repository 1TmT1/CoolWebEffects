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

let mousePosition = {
    x: 0,
    y: 0
};

function update() {
    if (drag) {
        requestAnimationFrame(update);
    }
    scrollImage.style.bottom = `${(startY + (moveY - startYPage) * -1)}px`;
}


const scrollImageOnDown = (e) => {
    drag = scrollImage;
    startYPage = e.pageY;
    startY = parseInt(scrollImage.style.bottom.replace(/\D/g, "")) || 0;
    requestAnimationFrame(update);
};

const scrollImageOnMove = (e) => {
    if (drag) {
        document.body.style.cursor = "grabbing";
        if (e.target !== document.body) {
            e.target.style.cursor = "inherit";
        }
        moveY = e.pageY;
    }

    mousePosition.x = e.pageY;
    mousePosition.y = e.pageX;
};

scrollImage.addEventListener("mousedown", scrollImageOnDown);
scrollImage.addEventListener("touchstart", (e) => {
    scrollImageOnDown(e); document.documentElement.style.overflow = 'hidden';
    startYPage = e.changedTouches[0].pageY;
});

document.addEventListener("touchend", (e) => {
    drag = null;
    startY = scrollImage.style.bottom;
    document.documentElement.style.overflow = 'auto';
});

document.addEventListener("mouseup", (e) => {
    drag = null;
    startY = scrollImage.style.bottom;
    document.body.style.cursor = "auto";
    // if (e.target !== document.body) {
    //     e.target.style.cursor = "inherit";
    // }
});

document.addEventListener("touchmove", (e) => {
    scrollImageOnMove(e);
    moveY = e.changedTouches[0].pageY;
});
document.addEventListener("mousemove", scrollImageOnMove);

// Magnet Effect

const lerp = (current, target, factor) => {
    return current * (1 - factor) + target * factor;
};

const calculateDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
}

// class MagneticObject {
//     constructor(documentElement) {
//         this.documentElement = documentElement;
//         this.boundingClientReact = this.documentElement.getBoundingClientReact();
//         this.triggerArea = 100;
//         this.interpolationFactor = 0.8;
//         this.lerpingData = {
//             x: {
//                 current: 0, 
//                 target: 0
//             },
//             y: {
//                 current: 0,
//                 target: 0
//             }
//         };

//         this.resize();
//         this.render();
//     }

//     resize() {
//         window.addEventListener("resize", (e) => {
//             this.boundingClientReact = this.documentElement.getBoundingClientReact();
//         });
//     }

//     render() {
//         // const distanceMouseToCenter
//         window.requestAnimationFrame(() => this.render());
//     }
// }

// new MagneticObject(scrollImage);
